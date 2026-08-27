#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_HOST="${DEPLOY_HOST:-212.85.26.8}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_TARGET_DIR="${DEPLOY_TARGET_DIR:-/opt/bidtech-frontend}"
DEPLOY_ENV_FILE="${DEPLOY_ENV_FILE:-/root/bidtech-frontend.env}"
DEPLOY_CONTAINER_NAME="${DEPLOY_CONTAINER_NAME:-BidTech-Frontend}"
DEPLOY_IMAGE_TAG="${DEPLOY_IMAGE_TAG:-bidtech-frontend:$(date +%Y%m%d%H%M%S)}"
DEPLOY_NETWORK="${DEPLOY_NETWORK:-bidtech-api}"
DEPLOY_PORT_BIND="${DEPLOY_PORT_BIND:-127.0.0.1:3010:3000}"

ARCHIVE_PATH="$(mktemp /tmp/bidtech-frontend.XXXXXX.tgz)"
REMOTE_ARCHIVE_PATH="/tmp/$(basename "$ARCHIVE_PATH")"
SSH_TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"

cleanup() {
  rm -f "$ARCHIVE_PATH"
}

trap cleanup EXIT

cd "$ROOT_DIR"

./scripts/build-template-demos.sh --copy
tar -czf "$ARCHIVE_PATH" frontend

ssh -o ConnectTimeout=10 "$SSH_TARGET" "rm -rf '$DEPLOY_TARGET_DIR' && mkdir -p '$DEPLOY_TARGET_DIR'"
scp "$ARCHIVE_PATH" "$SSH_TARGET:$REMOTE_ARCHIVE_PATH"

ssh "$SSH_TARGET" "
  set -e
  tar -xzf '$REMOTE_ARCHIVE_PATH' -C '$DEPLOY_TARGET_DIR' --strip-components=1
  rm -f '$REMOTE_ARCHIVE_PATH'

  cd '$DEPLOY_TARGET_DIR'
  test -f Dockerfile
  test -f '$DEPLOY_ENV_FILE'

  docker build -t '$DEPLOY_IMAGE_TAG' .
  docker rm -f '$DEPLOY_CONTAINER_NAME' 2>/dev/null || true
  docker rm -f BidTech-Admin-Frontend 2>/dev/null || true
  docker run -d \
    --name '$DEPLOY_CONTAINER_NAME' \
    --restart unless-stopped \
    --network '$DEPLOY_NETWORK' \
    -p '$DEPLOY_PORT_BIND' \
    --env-file '$DEPLOY_ENV_FILE' \
    '$DEPLOY_IMAGE_TAG'

  for attempt in 1 2 3 4 5 6; do
    if wget -qO- http://127.0.0.1:3010/ >/dev/null; then
      exit 0
    fi
    sleep 5
  done

  docker logs --tail 100 '$DEPLOY_CONTAINER_NAME'
  exit 1
"
