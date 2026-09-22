#!/usr/bin/env bash
set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-212.85.26.8}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_REPO_DIR="${DEPLOY_REPO_DIR:-/opt/bidtech-new}"
DEPLOY_ENV_FILE="${DEPLOY_ENV_FILE:-/root/bidtech-frontend.env}"
DEPLOY_CONTAINER_NAME="${DEPLOY_CONTAINER_NAME:-BidTech-Frontend}"
DEPLOY_NETWORK="${DEPLOY_NETWORK:-bidtech-api}"
DEPLOY_PORT_BIND="${DEPLOY_PORT_BIND:-127.0.0.1:3010:3000}"

SSH_TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"

echo "==> Deploying BidTech Frontend to ${SSH_TARGET}:${DEPLOY_REPO_DIR}"

ssh "$SSH_TARGET" "
  set -e
  echo '==> 1. Pulling latest git repository'
  cd '$DEPLOY_REPO_DIR'
  git pull origin main || git pull

  echo '==> 2. Moving to frontend folder'
  cd '$DEPLOY_REPO_DIR/frontend'

  test -f Dockerfile
  test -f '$DEPLOY_ENV_FILE'

  TAG=\$(date +%Y%m%d%H%M)
  IMAGE_NAME=\"bidtech-frontend:\$TAG\"

  echo \"==> 3. Building Docker image: \$IMAGE_NAME\"
  docker build -t \"\$IMAGE_NAME\" .

  echo '==> Current bidtech-frontend images:'
  docker images | grep bidtech-frontend || true

  echo '==> 4. Stopping & removing old container if running'
  docker stop '$DEPLOY_CONTAINER_NAME' 2>/dev/null || true
  docker rm '$DEPLOY_CONTAINER_NAME' 2>/dev/null || true

  echo '==> 5. Starting new container'
  docker run -d \
    --name '$DEPLOY_CONTAINER_NAME' \
    --restart unless-stopped \
    --network '$DEPLOY_NETWORK' \
    --env-file '$DEPLOY_ENV_FILE' \
    -p '$DEPLOY_PORT_BIND' \
    \"\$IMAGE_NAME\"

  echo '==> 6. Checking container status & logs'
  docker ps | grep '$DEPLOY_CONTAINER_NAME' || true
  docker logs --tail 100 '$DEPLOY_CONTAINER_NAME'

  echo '==> 7. Verifying HTTP Healthcheck'
  for attempt in 1 2 3 4 5 6; do
    if wget -qO- http://127.0.0.1:3010/ >/dev/null; then
      echo '==> Deployment successful!'
      exit 0
    fi
    sleep 5
  done

  echo '❌ Healthcheck failed!'
  docker logs --tail 100 '$DEPLOY_CONTAINER_NAME'
  exit 1
"
