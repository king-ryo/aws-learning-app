-- データベースの作成と選択
CREATE DATABASE IF NOT EXISTS sampledb;
USE sampledb;

-- テーブルの作成
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL
);

-- 初期データの投入（ここを英語に変更）
INSERT INTO messages (content) VALUES ('Hello from MySQL!');
INSERT INTO messages (content) VALUES ('Spring Boot connection successful!');