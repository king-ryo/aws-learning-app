# 軽量なJDK 21イメージ
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Gradleでビルドしたjarファイルをコンテナ内にコピー
COPY build/libs/*.jar app.jar

# 8080番ポートを公開
EXPOSE 8080

# jarファイルを実行
ENTRYPOINT ["java", "-jar", "app.jar"]