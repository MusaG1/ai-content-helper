#!/bin/bash
export PATH="/tmp/node-v20.11.0-darwin-x64/bin:$PATH"
cd "$(dirname "$0")"
echo "Building..."
npx next build
echo "Starting server on http://localhost:3000"
npx next start -p 3000
