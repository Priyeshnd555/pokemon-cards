#!/bin/bash

# Purpose: Automate CHANGELOG.md updates from commit messages.
# Why: Manual changelog updates are often forgotten. This ensures a living record of changes.

set -e

CHANGELOG="CHANGELOG.md"
COMMIT_MSG=$(git log -1 --pretty=%B)

# Determine category based on prefix
if [[ $COMMIT_MSG == add:* ]] || [[ $COMMIT_MSG == feat:* ]]; then
    CATEGORY="### Added"
    MSG=$(echo "$COMMIT_MSG" | sed 's/^[a-z]*: //')
elif [[ $COMMIT_MSG == fix:* ]]; then
    CATEGORY="### Fixed"
    MSG=$(echo "$COMMIT_MSG" | sed 's/^[a-z]*: //')
else
    CATEGORY="### Changed"
    MSG=$COMMIT_MSG
fi

# Clean up message (trim whitespace)
MSG=$(echo "$MSG" | xargs)

# Exit if message is empty
if [[ -z "$MSG" ]]; then
    exit 0
fi

echo "Updating changelog with: $MSG ($CATEGORY)"

# Professional approach: use sed to insert the message after the category header under [Unreleased]
# This logic finds the Unreleased section and then the specific category within it.
# We look for the range between [Unreleased] and the next version header.

# Find the line number of [Unreleased]
START_LINE=$(grep -n "## \[Unreleased\]" "$CHANGELOG" | cut -d: -f1)
# Find the line number of the next version (first ## that isn't Unreleased)
END_LINE=$(grep -n "## \[" "$CHANGELOG" | grep -v "Unreleased" | head -n 1 | cut -d: -f1)

if [[ -z "$END_LINE" ]]; then
    # If no other versions exist yet, go to end of file
    END_LINE=$(wc -l < "$CHANGELOG")
    ((END_LINE++))
fi

# Find the category line within that range
CAT_LINE=$(sed -n "${START_LINE},${END_LINE}p" "$CHANGELOG" | grep -n "$CATEGORY" | head -n 1 | cut -d: -f1)

if [[ -z "$CAT_LINE" ]]; then
    echo "Category $CATEGORY not found in [Unreleased] section."
    exit 1
fi

# Absolute line number for insertion
# CAT_LINE is 1-indexed relative to START_LINE, so START_LINE + CAT_LINE - 1 is the actual line number of the category header.
INSERT_LINE=$((START_LINE + CAT_LINE - 1))

# Insert the message
sed -i '' "${INSERT_LINE}a\\
- ${MSG}
" "$CHANGELOG"

echo "Changelog updated successfully."
