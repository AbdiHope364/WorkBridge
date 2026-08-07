#!/bin/bash
echo "🚀 Starting API server on port 3001..."
cd apps/api
pnpm json-server --watch db.json --port 3001 --host 0.0.0.0
