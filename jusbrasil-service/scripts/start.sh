#!/bin/sh

# $1 Error message
fail() {
  echo "$1"
  echo "Exiting"
  exit 1
}

startService() {
  echo "Starting jusbrasil service..."
#   yarn migration:run
#   yarn schema:register
  NODE_ENV=production node dist/index.js
}

echo "Initializing jusbrasil service environment..."

# Start the service

# Main
set -e
CMD=${1:-"start"}
ENVIRONMENT=${ENVIRONMENT:-"local"}

case "$CMD" in
start)
  startService
  ;;
*)
  fail "Invalid command: $CMD"
esac
