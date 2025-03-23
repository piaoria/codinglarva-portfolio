#!/bin/bash

cd "$WORKSPACE" || exit 1

echo "[✅ 빌드 시작] $(date)"

# 최신 코드 가져오기
git pull origin master || {
  echo "❌ Git pull 실패"
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Git pull 실패"}' https://discord.com/api/webhooks/1353309083565817941/1JQ3EYIqZo31Y3lI6hqXApuzGPP7-eB9xdjDFbROEMRcydj1ezqJcD15UbN60M-50fZJ
  exit 1
}

# Docker 이미지 빌드
docker build -t codinglarva-portfolio . || {
  echo "❌ Docker build 실패"
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Docker build 실패"}' https://discord.com/api/webhooks/1353309083565817941/1JQ3EYIqZo31Y3lI6hqXApuzGPP7-eB9xdjDFbROEMRcydj1ezqJcD15UbN60M-50fZJ
  exit 1
}

# 기존 컨테이너 제거
docker rm -f codinglarva || true

# 새 컨테이너 실행
docker run -d --name codinglarva -p 3000:3000 codinglarva-portfolio || {
  echo "❌ Docker run 실패"
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Docker run 실패"}' https://discord.com/api/webhooks/1353309083565817941/1JQ3EYIqZo31Y3lI6hqXApuzGPP7-eB9xdjDFbROEMRcydj1ezqJcD15UbN60M-50fZJ
  exit 1
}

# Discord 알림 (성공)
curl -H "Content-Type: application/json" -X POST \
  -d '{"content":"✅ Jenkins 배포 성공! 🎉\n⏰ '"$(date)"'"}' \
  https://discord.com/api/webhooks/1353309083565817941/1JQ3EYIqZo31Y3lI6hqXApuzGPP7-eB9xdjDFbROEMRcydj1ezqJcD15UbN60M-50fZJ

echo "[✅ 배포 완료] $(date)"
