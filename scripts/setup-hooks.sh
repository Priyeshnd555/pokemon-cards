#!/bin/bash

# Purpose: Install Git hooks for the project.
# Why: Hooks ensure that all developers follow the same automated workflows.

set -e

HOOKS_DIR=".git/hooks"
POST_COMMIT="$HOOKS_DIR/post-commit"

echo "Installing post-commit hook..."

cat > "$POST_COMMIT" << 'EOF'
#!/bin/bash
# Automatically update changelog on commit
./scripts/update-changelog.sh
EOF

chmod +x "$POST_COMMIT"

echo "Git hooks installed successfully."
