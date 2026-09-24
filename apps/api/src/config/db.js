import { MongoClient } from 'mongodb';
import { randomUUID } from 'crypto';

class InMemoryCollection {
  constructor(name) {
    this.name = name;
    this.documents = [];
  }

  _matchesQuery(doc, filter) {
    if (!filter || Object.keys(filter).length === 0) return true;
    for (const [key, filterValue] of Object.entries(filter)) {
      if (key === '$or' && Array.isArray(filterValue)) {
        const matched = filterValue.some(subFilter => this._matchesQuery(doc, subFilter));
        if (!matched) return false;
        continue;
      }
      if (key === '$and' && Array.isArray(filterValue)) {
        const matched = filterValue.every(subFilter => this._matchesQuery(doc, subFilter));
        if (!matched) return false;
        continue;
      }

      const docVal = doc[key];
      if (filterValue && typeof filterValue === 'object' && !Array.isArray(filterValue) && !(filterValue instanceof RegExp)) {
        if (filterValue.$regex) {
          const flags = filterValue.$options || '';
          const regex = filterValue.$regex instanceof RegExp 
            ? filterValue.$regex 
            : new RegExp(filterValue.$regex, flags);
          if (!regex.test(String(docVal || ''))) return false;
        } else if (filterValue.$in && Array.isArray(filterValue.$in)) {
          if (!filterValue.$in.includes(docVal)) return false;
        } else if (filterValue.$ne !== undefined) {
          if (docVal === filterValue.$ne) return false;
        } else if (filterValue.$eq !== undefined) {
          if (docVal !== filterValue.$eq) return false;
        } else if (filterValue.$gt !== undefined) {
          if (!(docVal > filterValue.$gt)) return false;
        } else if (filterValue.$gte !== undefined) {
          if (!(docVal >= filterValue.$gte)) return false;
        } else if (filterValue.$lt !== undefined) {
          if (!(docVal < filterValue.$lt)) return false;
        } else if (filterValue.$lte !== undefined) {
          if (!(docVal <= filterValue.$lte)) return false;
        } else {
          if (JSON.stringify(docVal) !== JSON.stringify(filterValue)) return false;
        }
      } else {
        if (String(docVal) !== String(filterValue) && docVal !== filterValue) return false;
      }
    }
    return true;
  }

  _applyUpdate(doc, update) {
    if (update.$set) {
      Object.assign(doc, update.$set);
    }
    if (update.$inc) {
      for (const [field, incVal] of Object.entries(update.$inc)) {
        doc[field] = (Number(doc[field]) || 0) + incVal;
      }
    }
    if (update.$push) {
      for (const [field, pushVal] of Object.entries(update.$push)) {
        if (!Array.isArray(doc[field])) doc[field] = [];
        doc[field].push(pushVal);
      }
    }
    if (update.$pull) {
      for (const [field, pullVal] of Object.entries(update.$pull)) {
        if (Array.isArray(doc[field])) {
          doc[field] = doc[field].filter(item => JSON.stringify(item) !== JSON.stringify(pullVal));
        }
      }
    }
    return doc;
  }

  find(filter = {}) {
    let results = this.documents.filter(doc => this._matchesQuery(doc, filter));
    const cursor = {
      toArray: async () => [...results],
      sort: (sortObj) => {
        const [field, order] = Object.entries(sortObj)[0] || [];
        if (field) {
          results.sort((a, b) => {
            if (a[field] < b[field]) return order === 1 ? -1 : 1;
            if (a[field] > b[field]) return order === 1 ? 1 : -1;
            return 0;
          });
        }
        return cursor;
      },
      limit: (num) => {
        results = results.slice(0, num);
        return cursor;
      },
      skip: (num) => {
        results = results.slice(num);
        return cursor;
      }
    };
    return cursor;
  }

  async findOne(filter = {}) {
    return this.documents.find(doc => this._matchesQuery(doc, filter)) || null;
  }

  async insertOne(doc) {
    const newDoc = { _id: doc._id || randomUUID(), id: doc.id || randomUUID(), ...doc };
    this.documents.push(newDoc);
    return { acknowledged: true, insertedId: newDoc._id };
  }

  async insertMany(docs) {
    const insertedIds = {};
    const newDocs = docs.map((doc, idx) => {
      const _id = doc._id || randomUUID();
      insertedIds[idx] = _id;
      return { _id, id: doc.id || _id, ...doc };
    });
    this.documents.push(...newDocs);
    return { acknowledged: true, insertedCount: newDocs.length, insertedIds };
  }

  async updateOne(filter, update, options = {}) {
    const doc = this.documents.find(d => this._matchesQuery(d, filter));
    if (doc) {
      this._applyUpdate(doc, update);
      return { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
    } else if (options.upsert) {
      const newDoc = { _id: randomUUID(), ...filter };
      this._applyUpdate(newDoc, update);
      this.documents.push(newDoc);
      return { acknowledged: true, matchedCount: 0, modifiedCount: 0, upsertedId: newDoc._id };
    }
    return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
  }

  async updateMany(filter, update) {
    const docs = this.documents.filter(d => this._matchesQuery(d, filter));
    docs.forEach(doc => this._applyUpdate(doc, update));
    return { acknowledged: true, matchedCount: docs.length, modifiedCount: docs.length };
  }

  async deleteOne(filter) {
    const idx = this.documents.findIndex(d => this._matchesQuery(d, filter));
    if (idx !== -1) {
      this.documents.splice(idx, 1);
      return { acknowledged: true, deletedCount: 1 };
    }
    return { acknowledged: true, deletedCount: 0 };
  }

  async deleteMany(filter) {
    const initialLen = this.documents.length;
    this.documents = this.documents.filter(d => !this._matchesQuery(d, filter));
    return { acknowledged: true, deletedCount: initialLen - this.documents.length };
  }

  async countDocuments(filter = {}) {
    return this.documents.filter(d => this._matchesQuery(d, filter)).length;
  }

  async findOneAndUpdate(filter, update, options = {}) {
    const doc = this.documents.find(d => this._matchesQuery(d, filter));
    if (doc) {
      const original = JSON.parse(JSON.stringify(doc));
      this._applyUpdate(doc, update);
      return options.returnDocument === 'after' ? doc : original;
    }
    return null;
  }
}

class InMemoryDB {
  constructor() {
    this.collections = new Map();
  }
  collection(name) {
    if (!this.collections.has(name)) {
      this.collections.set(name, new InMemoryCollection(name));
    }
    return this.collections.get(name);
  }
}

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/workbridge';
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log('[MongoDB] Connected successfully to live database');
    return client.db();
  } catch (error) {
    console.warn('\n============================================================');
    console.warn('[MongoDB Warning] Could not connect to remote database Atlas.');
    console.warn('Reason:', error.message || error);
    console.warn('\n>>> FALLBACK TO IN-MEMORY DATABASE ENABLED:');
    console.warn('The API server will now automatically run using an In-Memory Database');
    console.warn('seeded with mockups, allowing offline development and testing.');
    console.warn('To use live MongoDB Atlas:');
    console.warn('  Add 0.0.0.0/0 (or your IP) to MongoDB Atlas -> Network Access.');
    console.warn('============================================================\n');

    return new InMemoryDB();
  }
};


