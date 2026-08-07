#!/bin/bash
echo "🧪 Testing API endpoints..."
echo ""

# Test with curl
echo "Testing http://localhost:3001/api/jobs"
curl -s http://localhost:3001/api/jobs | head -20 || echo "❌ API not reachable"

echo ""
echo "Testing http://localhost:3000/api/jobs"
curl -s http://localhost:3000/api/jobs | head -20 || echo "❌ API not reachable"
