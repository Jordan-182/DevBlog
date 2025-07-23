import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET 
  utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE \`${MYSQL_DB_NAME}\`;

  CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	avatar VARCHAR(255) NOT NULL,
	status ENUM('Admin', 'Reader') NOT NULL DEFAULT 'Reader',
	PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS articles (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
	title VARCHAR(255) NOT NULL,
	slug VARCHAR(255) NOT NULL,
	summary TEXT NOT NULL,
	content LONGTEXT NOT NULL,
	cover_url TEXT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_id INT NOT NULL,
	PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS categories (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
	name VARCHAR(100) NOT NULL,
	PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS article_categories (
  article_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY(article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS likes (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
	article_id INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY(id),
  UNIQUE(article_id, user_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
  id INT NOT NULL AUTO_INCREMENT,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  article_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(schema);
    await connection.end();

    console.log("✅ Database schema created successfully");
  } catch (err) {
    console.error("❌ Error during migration:", err);
  }
};

migrate();
