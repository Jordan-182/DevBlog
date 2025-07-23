import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";
import path from "path";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const articlesPath = path.join(__dirname, "../src/data/articles.json");
const articles = JSON.parse(fs.readFileSync(articlesPath, "utf-8"));
const usersPath = path.join(__dirname, "../src/data/users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

const seed = async () => {
  try {
    const db = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    });

    await db.query("DELETE FROM articles");
    await db.query("ALTER TABLE articles AUTO_INCREMENT = 1");

    for (const { name, email, avatar, status } of users) {
      await db.query(
        "INSERT INTO users (name, email, avatar, status) VALUES (?, ?, ?, ?)",
        [name, email, avatar, status]
      );
    }

    for (const {
      title,
      slug,
      summary,
      content,
      cover_url,
      created_at,
      user_id,
    } of articles) {
      await db.query(
        "INSERT INTO articles (title, slug, summary, content, cover_url, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, slug, summary, content, cover_url, created_at, user_id]
      );
    }

    await db.end();
    console.log("🌱 Database seeded successfully");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
};

seed();
