import 'dotenv/config';
import app from './app.js';
import { initDB } from './data/db.js';

const start = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    await initDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`WorkBridge API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
