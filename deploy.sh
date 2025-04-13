#!/bin/bash

# 오류 발생 시 즉시 종료
set -e

# 환경 변수 로드
source .env

# 디스코드 Webhook 주소
WEBHOOK_URL="$DISCORD_SECRET"

echo "[🚀 빌드 시작] $(date)"

git pull origin master || {
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Git pull 실패!"}' "$WEBHOOK_URL"
  exit 1
}

echo "🔨 Docker 이미지 빌드 시작..."
docker build -t codinglarva-portfolio . || {
    echo "❌ Docker 빌드 실패!"
    curl -H "Content-Type: application/json" -X POST \
      -d '{"content":"❌ Docker build 실패!"}' "$WEBHOOK_URL"
    exit 1
}

echo "✅ Docker 이미지 빌드 완료"

# 포트 3000을 점유하고 있는 컨테이너가 있으면 중지 및 제거
PORT_IN_USE=$(docker ps --format "{{.ID}} {{.Ports}}" | grep "0.0.0.0:3000" | awk '{print $1}')
if [ -n "$PORT_IN_USE" ]; then
  echo "⚠️ 포트 3000 사용 중인 컨테이너 정리: $PORT_IN_USE"
  docker stop "$PORT_IN_USE"
  docker rm "$PORT_IN_USE"
fi

# 기존 컨테이너 중지 및 제거
echo "🗑️ 기존 컨테이너 정리..."
docker stop codinglarva || true
docker rm codinglarva || true

# 새 컨테이너 실행
echo "🚀 새 컨테이너 실행..."
docker run -d \
    --name codinglarva \
    -p 3000:3000 \
    -e NOTION_API_KEY="$NOTION_API_KEY" \
    -e NOTION_DATABASE_ID="$NOTION_DATABASE_ID" \
    codinglarva-portfolio || {
    echo "❌ Docker 컨테이너 실행 실패!"
    curl -H "Content-Type: application/json" -X POST \
      -d '{"content":"❌ Docker run 실패! (포트 중복 또는 기타 문제)"}' "$WEBHOOK_URL"
    exit 1
}

# 성공 알림
curl -H "Content-Type: application/json" -X POST \
  -d '{"content":"✅ Jenkins 배포 성공! 🎉\n⏰ '"$(date)"'"}' \
  "$WEBHOOK_URL"

echo "[✅ 배포 완료] $(date)"