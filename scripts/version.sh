#!/bin/bash

# Purpose: Automate semantic versioning across package.json and app.json.
# Why: Manual versioning is error-prone. This ensures consistency between JS and Native layers.

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

TYPE=$1

if [[ -z "$TYPE" ]]; then
    echo -e "${RED}Error: Version type (patch, minor, major) required.${NC}"
    echo "Usage: ./scripts/version.sh [patch|minor|major]"
    exit 1
fi

echo -e "${BLUE}Bumping $TYPE version...${NC}"

# 1. Bump version in package.json using npm version (updates package.json & lock file)
NEW_VERSION=$(npm version $TYPE --no-git-tag-version)
# npm version returns 'v1.0.1', we want '1.0.1'
VERSION_NUMBER=${NEW_VERSION#v}

echo -e "${GREEN}New version: $VERSION_NUMBER${NC}"

# 2. Sync with app.json using node to avoid heavy jq dependency
# This script handles the nested structure of app.json safely
node -e "
const fs = require('fs');
const appJson = JSON.parse(fs.readFileSync('./app.json', 'utf8'));

// Update root version
appJson.expo.version = '$VERSION_NUMBER';

// Bump Android version code (integer)
if (appJson.expo.android) {
  const oldCode = appJson.expo.android.versionCode || 0;
  appJson.expo.android.versionCode = oldCode + 1;
  console.log('Android versionCode bumped to:', appJson.expo.android.versionCode);
}

// Bump iOS build number (stringified integer)
if (appJson.expo.ios) {
  const oldBuild = parseInt(appJson.expo.ios.buildNumber || '0');
  appJson.expo.ios.buildNumber = (oldBuild + 1).toString();
  console.log('iOS buildNumber bumped to:', appJson.expo.ios.buildNumber);
}

fs.writeFileSync('./app.json', JSON.stringify(appJson, null, 2) + '\n');
"

# 3. Update CHANGELOG.md
# Professional approach: Replace [Unreleased] with new version and date, then prepend fresh [Unreleased]
DATE=$(date +%Y-%m-%d)
CHANGELOG="CHANGELOG.md"

echo -e "${BLUE}Updating $CHANGELOG for version $VERSION_NUMBER...${NC}"

# Replace [Unreleased] header with new version number and date
sed -i '' "s/## \[Unreleased\]/## \[$VERSION_NUMBER\] - $DATE/" "$CHANGELOG"

# Prepend a fresh [Unreleased] section
# We use a temporary file to safely prepend
TEMP_CHANGELOG=$(mktemp)
echo "# Changelog" > "$TEMP_CHANGELOG"
echo "All notable changes to this project will be documented in this file." >> "$TEMP_CHANGELOG"
echo "" >> "$TEMP_CHANGELOG"
echo "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)," >> "$TEMP_CHANGELOG"
echo "and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)." >> "$TEMP_CHANGELOG"
echo "" >> "$TEMP_CHANGELOG"
echo "## [Unreleased]" >> "$TEMP_CHANGELOG"
echo "### Added" >> "$TEMP_CHANGELOG"
echo "### Changed" >> "$TEMP_CHANGELOG"
echo "### Fixed" >> "$TEMP_CHANGELOG"
echo "" >> "$TEMP_CHANGELOG"

# Append the rest of the original changelog (skipping the first 6 lines which we just recreated)
tail -n +7 "$CHANGELOG" >> "$TEMP_CHANGELOG"

mv "$TEMP_CHANGELOG" "$CHANGELOG"

echo -e "${GREEN}Successfully synchronized version $VERSION_NUMBER across all configurations and updated CHANGELOG.md.${NC}"
