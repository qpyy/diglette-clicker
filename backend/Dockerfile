# Стадия сборки
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Стадия запуска
FROM node:14
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "api/server.js"]

