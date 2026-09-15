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

# 빌드 실행 (Windows CRLF 워킹트리에서도 prettier 린트에 막히지 않게 한다)
RUN npm run build -- --no-lint

EXPOSE 3000

CMD ["npm", "start"]
