FROM node:22.14.0-slim

WORKDIR /app

ENV TAILWIND_MODE=build
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 의존성 설치
COPY package*.json ./
RUN npm install --include=dev

# 소스 코드 복사
COPY . .

# 빌드 시 환경 변수 전달
ARG NOTION_API_KEY
ARG NOTION_DOCS_DATABASE_ID
ENV NOTION_API_KEY=$NOTION_API_KEY
ENV NOTION_DOCS_DATABASE_ID=$NOTION_DOCS_DATABASE_ID

# 빌드 실행
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
