#!/bin/bash

echo "🔧 Fixing Tailwind CSS IntelliSense warnings..."

# Fix admin app
echo "📝 Fixing admin app..."
find apps/admin -name "*.tsx" -type f -exec sed -i \
  -e 's/max-h-\[480px\]/max-h-120/g' \
  -e 's/flex-shrink-0/shrink-0/g' \
  -e 's/max-w-\[120px\]/max-w-30/g' \
  -e 's/max-w-\[140px\]/max-w-35/g' \
  {} \;

# Fix client app
echo "📝 Fixing client app..."
find apps/client -name "*.tsx" -type f -exec sed -i \
  -e 's/max-w-\[560px\]/max-w-140/g' \
  -e 's/max-w-\[500px\]/max-w-125/g' \
  -e 's/max-w-\[610px\]/max-w-152.5/g' \
  {} \;

# Fix docs app if needed
echo "📝 Fixing docs app..."
find apps/docs -name "*.tsx" -type f -exec sed -i \
  -e 's/max-w-\[560px\]/max-w-140/g' \
  -e 's/max-w-\[500px\]/max-w-125/g' \
  -e 's/max-h-\[480px\]/max-h-120/g' \
  -e 's/flex-shrink-0/shrink-0/g' \
  {} \;

echo "✅ All Tailwind warnings fixed!"
echo ""
echo "📖 Canonical class names used:"
echo "  max-h-[480px]  → max-h-120"
echo "  flex-shrink-0  → shrink-0"
echo "  max-w-[120px]  → max-w-30"
echo "  max-w-[560px]  → max-w-140"
echo "  max-w-[500px]  → max-w-125"
echo "  max-w-[610px]  → max-w-152.5"
