# 1. ビルド環境 (Node.js 22に変更)
FROM node:22 AS build
WORKDIR /app
# パッケージ情報を先にコピーしてインストール
COPY package*.json ./
RUN npm install
# ソースコードをコピーしてビルド
COPY . .
RUN npm run build

# 2. 実行環境 (Nginx)
FROM nginx:alpine
# ビルドした静的ファイルをNginxの配信フォルダにコピー
COPY --from=build /app/dist /usr/share/nginx/html
# 80番ポートで配信する
EXPOSE 80