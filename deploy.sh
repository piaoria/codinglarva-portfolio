echo "🔍 환경 변수 확인 중..."
echo "현재 설정된 환경 변수:"
env | grep -E "NOTION|DISCORD"

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

git pull origin master || {
  curl -H "Content-Type: application/json" -X POST \
    -d '{"content":"❌ Git pull 실패!"}' "$WEBHOOK_URL"
  exit 1
}

# 모든 관련 컨테이너 중지 및 제거
echo "🗑️ 기존 컨테이너 정리..."
for container in codinglarva-portfolio codinglarva portfolio; do
  echo "🔍 $container 컨테이너 정리 중..."
  docker stop $container 2>/dev/null || true
  docker rm $container 2>/dev/null || true
done

echo "🧹 Docker 캐시 정리..."
docker system prune -f
docker builder prune -f

echo "🧹 Next.js 캐시 정리..."
rm -rf .next/cache
rm -rf .next/static

# 이전 이미지 제거
echo "🗑️ 이전 이미지 정리..."
docker rmi codinglarva-portfolio:latest 2>/dev/null || true

# 새 이미지 빌드
echo "🔨 Docker 이미지 빌드 시작..."
docker build -t codinglarva-portfolio:$(date +%Y%m%d%H%M%S) . 2>&1 | tee docker-build.log || {
    echo "❌ Docker 빌드 실패!"
    echo "빌드 로그:"
    cat docker-build.log
    curl -H "Content-Type: application/json" -X POST \
      -d '{"content":"❌ Docker build 실패!\n로그: '"$(cat docker-build.log)"'"}' "$WEBHOOK_URL"
    exit 1
}

echo "✅ Docker 이미지 빌드 완료"

# 포트 3000을 점유하고 있는 컨테이너가 있으면 중지 및 제거
echo "🔍 포트 3000 사용 중인 컨테이너 확인..."
PORT_IN_USE=$(docker ps -a --format "{{.ID}} {{.Ports}}" | grep "0.0.0.0:3000" | awk '{print $1}')
if [ -n "$PORT_IN_USE" ]; then
  echo "⚠️ 포트 3000 사용 중인 컨테이너 정리: $PORT_IN_USE"
  docker stop "$PORT_IN_USE" 2>/dev/null || true
  docker rm "$PORT_IN_USE" 2>/dev/null || true
fi

# 새 컨테이너 실행
echo "🚀 새 컨테이너 실행..."
echo "전달되는 환경 변수:"
echo "NOTION_API_KEY: ${NOTION_API_KEY:+설정됨}"
echo "NOTION_DOCS_DATABASE_ID: ${NOTION_DOCS_DATABASE_ID:+설정됨}"

# 포트 사용 확인
if lsof -i :3000 > /dev/null 2>&1; then
  echo "❌ 포트 3000이 이미 사용 중입니다!"
  echo "사용 중인 프로세스:"
  lsof -i :3000
  exit 1
fi

# 최신 이미지 태그 확인
LATEST_IMAGE=$(docker images codinglarva-portfolio --format "{{.Tag}}" | sort -r | head -n 1)
if [ -z "$LATEST_IMAGE" ]; then
  echo "❌ 사용 가능한 이미지를 찾을 수 없습니다!"
  exit 1
fi

echo "📦 사용할 이미지 태그: $LATEST_IMAGE"

docker run -d \
    --name codinglarva-portfolio \
    -p 3000:3000 \
    -e NOTION_API_KEY="$NOTION_API_KEY" \
    -e NOTION_DOCS_DATABASE_ID="$NOTION_DOCS_DATABASE_ID" \
    -e NODE_ENV=production \
    --log-driver=json-file \
    --log-opt max-size=10m \
    --log-opt max-file=3 \
    codinglarva-portfolio:$LATEST_IMAGE || {
    echo "❌ Docker 컨테이너 실행 실패!"
    echo "실패 원인 확인 중..."
    docker logs codinglarva-portfolio --tail 50 2>/dev/null || true
    curl -H "Content-Type: application/json" -X POST \
      -d '{"content":"❌ Docker run 실패!\n로그: '"$(docker logs codinglarva-portfolio --tail 50 2>/dev/null || echo '로그 없음')"'"}' "$WEBHOOK_URL"
    exit 1
}

# 컨테이너 상태 확인
echo "🔍 컨테이너 상태 확인..."
sleep 5
if ! docker ps | grep -q codinglarva-portfolio; then
  echo "❌ 컨테이너가 실행되지 않았습니다!"
  docker logs codinglarva-portfolio --tail 50 2>/dev/null || true
  exit 1
fi

# 컨테이너 로그 확인
echo "📝 컨테이너 로그 확인 중..."
docker logs codinglarva-portfolio --tail 50

# 성공 알림
curl -H "Content-Type: application/json" -X POST \
  -d '{"content":"✅ Jenkins 배포 성공! 🎉\n⏰ '"$(date)"'"}' \
  "$WEBHOOK_URL"

echo "[✅ 배포 완료] $(date)"