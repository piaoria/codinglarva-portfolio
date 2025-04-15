FROM node:22-slim

WORKDIR /app

ENV TAILWIND_MODE=build
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 의존성 설치
COPY package*.json ./
RUN npm install --include=dev

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
