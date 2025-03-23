# 디스코드 Webhook 주소
WEBHOOK_URL="https://discord.com/api/webhooks/1353309083565817941/1JQ3EYIqZo31Y3lI6hqXApuzGPP7-eB9xdjDFbROEMRcydj1ezqJcD15UbN60M-50fZJ"  # 본인 주소로 교체

echo "[🚀 빌드 시작] $(date)"

git pull origin master || {
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Git pull 실패!"}' "$WEBHOOK_URL"
  exit 1
}

# Docker 빌드
docker build -t codinglarva-portfolio . || {
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Docker build 실패!"}' "$WEBHOOK_URL"
  exit 1
}

# 이전 컨테이너 제거
docker rm -f codinglarva || true

# 새 컨테이너 실행
docker run -d --name codinglarva -p 3000:3000 codinglarva-portfolio || {
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Docker run 실패!"}' "$WEBHOOK_URL"
  exit 1
}

# 성공 알림
curl -H "Content-Type: application/json" -X POST \
  -d '{"content":"✅ Jenkins 배포 성공! 🎉\n⏰ '"$(date)"'"}' \
  "$WEBHOOK_URL"

echo "[✅ 배포 완료] $(date)"
