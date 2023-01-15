#!/bin/sh

# $1 Error message
fail() {
  echo "$1"
  echo "Exiting"
  exit 1
}

startService() {
  echo "Starting jusbrasil service..."
  yarn migration
  yarn seed
  NODE_ENV=production node dist/index.js
}

echo "Initializing jusbrasil service environment..."

# Start the service

# Main
set -e
CMD=${1:-"start"}

case "$CMD" in
start)
  startService
  ;;
*)
  fail "Invalid command: $CMD"
esac
