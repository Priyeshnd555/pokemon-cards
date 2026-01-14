#!/bin/bash

# Purpose: Comprehensive cleanup of the React Native / Expo development environment.
# Why: Frequent build issues in mobile dev are caused by stale caches. This script ensures a "known good" state.

set -e # Exit on error

# Terminal colors for professional logging
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}[Maintenance] Starting Deep Clean...${NC}"

# 1. Kill any existing packager
echo -e "${BLUE}Stopping Metro Bundler...${NC}"
pkill -9 -f "metro" || true

# 2. Watchman cleanup
if command -v watchman &> /dev/null; then
    echo -e "${BLUE}Clearing Watchman...${NC}"
    watchman watch-del-all
fi

# 3. Cache cleanup (Metro, RN, Jest)
echo -e "${BLUE}Cleaning caches...${NC}"
rm -rf $TMPDIR/metro-cache
rm -rf $TMPDIR/react-native-packager-cache-*
rm -rf $TMPDIR/haste-map-*
rm -rf .jest/cache

# 4. Android Cleanup
if [ -d "android" ]; then
    echo -e "${BLUE}Cleaning Android build folder...${NC}"
    cd android
    ./gradlew clean
    cd ..
fi

# 5. iOS Cleanup
if [ -d "ios" ]; then
    echo -e "${BLUE}Cleaning iOS build artifacts...${NC}"
    rm -rf ios/build
    # DerivedData cleanup is often helpful but aggressive
    # rm -rf ~/Library/Developer/Xcode/DerivedData
fi

npx expo prebuild --clean

# 6. Reinstall dependencies (Optionally)
# echo -e "${BLUE}Reinstalling node_modules...${NC}"
# rm -rf node_modules
# npm install

echo -e "${GREEN}Cleanup complete. You are ready for a fresh build.${NC}"
