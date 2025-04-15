echo "🔍 환경 변수 확인 중..."
echo "현재 설정된 환경 변수:"
env | grep -E "NOTION|DISCORD"

# 시스템 정보 출력
echo "🔍 시스템 정보 확인"
echo "Node.js 버전:"
node -v
echo "npm 버전:"
npm -v
echo "Docker 버전:"
docker --version
echo "디스크 공간:"
df -h

# Docker 캐시 정리
echo "🧹 Docker 캐시 정리 중..."
docker system prune -f
docker builder prune -f

# 필수 환경 변수 확인
MISSING_ENV=false
if [ -z "$NOTION_API_KEY" ]; then
    echo "❌ NOTION_API_KEY가 설정되지 않았습니다!"
    MISSING_ENV=true
fi
if [ -z "$NOTION_DOCS_DATABASE_ID" ]; then
    echo "❌ NOTION_DOCS_DATABASE_ID가 설정되지 않았습니다!"
    MISSING_ENV=true
fi
if [ -z "$DISCORD_SECRET" ]; then
    echo "❌ DISCORD_SECRET이 설정되지 않았습니다!"
    MISSING_ENV=true
fi

if [ "$MISSING_ENV" = true ]; then
    exit 1
fi

# 디스코드 Webhook 주소
WEBHOOK_URL="$DISCORD_SECRET"

echo "[🚀 빌드 시작] $(date)"

# 기존 컨테이너 중지 및 제거
echo "🗑️ 기존 컨테이너 정리..."
docker stop codinglarva-portfolio || true
docker rm codinglarva-portfolio || true

# 포트 3000을 점유하고 있는 컨테이너가 있으면 중지 및 제거
PORT_IN_USE=$(docker ps --format "{{.ID}} {{.Ports}}" | grep "0.0.0.0:3000" | awk '{print $1}')
if [ -n "$PORT_IN_USE" ]; then
  echo "⚠️ 포트 3000 사용 중인 컨테이너 정리: $PORT_IN_USE"
  docker stop "$PORT_IN_USE"
  docker rm "$PORT_IN_USE"
fi

git pull origin master || {
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Git pull 실패!"}' "$WEBHOOK_URL"
  exit 1
}

echo "🔨 Docker 이미지 빌드 시작..."
# 빌드 로그를 파일로 저장
docker build \
  --build-arg NOTION_API_KEY="$NOTION_API_KEY" \
  --build-arg NOTION_DOCS_DATABASE_ID="$NOTION_DOCS_DATABASE_ID" \
  -t codinglarva-portfolio:latest . 2>&1 | tee docker-build.log || {
    echo "❌ Docker 빌드 실패!"
    echo "빌드 로그:"
    cat docker-build.log
    curl -H "Content-Type: application/json" -X POST \
      -d '{"content":"❌ Docker build 실패!\n로그: '"$(cat docker-build.log)"'"}' "$WEBHOOK_URL"
    exit 1
}

echo "✅ Docker 이미지 빌드 완료"

# 새 컨테이너 실행
echo "🚀 새 컨테이너 실행..."
echo "전달되는 환경 변수:"
echo "NOTION_API_KEY: ${NOTION_API_KEY:+설정됨}"
echo "NOTION_DOCS_DATABASE_ID: ${NOTION_DOCS_DATABASE_ID:+설정됨}"

docker run -d \
    --name codinglarva-portfolio \
    -p 3000:3000 \
    -e NOTION_API_KEY="$NOTION_API_KEY" \
    -e NOTION_DOCS_DATABASE_ID="$NOTION_DOCS_DATABASE_ID" \
    codinglarva-portfolio || {
    echo "❌ Docker 컨테이너 실행 실패!"
    curl -H "Content-Type: application/json" -X POST \
      -d '{"content":"❌ Docker run 실패! (포트 중복 또는 기타 문제)"}' "$WEBHOOK_URL"
    exit 1
}

# 컨테이너 상태 확인
echo "🔍 컨테이너 상태 확인"
docker ps -a | grep codinglarva-portfolio
docker logs codinglarva-portfolio

# 성공 알림
curl -H "Content-Type: application/json" -X POST \
  -d '{"content":"✅ Jenkins 배포 성공! 🎉\n⏰ '"$(date)"'"}' \
  "$WEBHOOK_URL"

echo "[✅ 배포 완료] $(date)"