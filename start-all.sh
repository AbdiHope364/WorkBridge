#!/bin/bash
echo "🚀 Starting all services..."
echo ""
echo "1. Starting API server..."
cd apps/api
pnpm json-server --watch db.json --port 3001 --host 0.0.0.0 &
API_PID=$!
echo "✅ API server started (PID: $API_PID)"
echo ""

echo "2. Starting Next.js client..."
cd ../client
pnpm dev &
CLIENT_PID=$!
echo "✅ Client started (PID: $CLIENT_PID)"
echo ""

echo "📋 Services running:"
echo "  - API: http://localhost:3001"
echo "  - Client: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $API_PID $CLIENT_PID 2>/dev/null; exit" INT
wait
