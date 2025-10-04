import Database from "better-sqlite3";
import { join } from "path";

const dbPath = join(process.cwd(), "db", "cubert.db");

export const db = new Database(dbPath);

// users table
db.prepare(
  `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT,
  bio TEXT,
  hashed_password TEXT,
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0
)
`,
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS user_following (
  user_id TEXT,
  following_user_id TEXT,
  PRIMARY KEY (user_id, following_user_id)
)
`,
).run();

// users table
db.prepare(
  `
CREATE TABLE IF NOT EXISTS user_likes (
  user_id TEXT,
  post_id TEXT,
  PRIMARY KEY (user_id, post_id)
)
`,
).run();

// algorithms table
db.prepare(
  `
CREATE TABLE IF NOT EXISTS algorithms (
  id TEXT PRIMARY KEY,
  category TEXT,
  name TEXT,
  moves TEXT,
  description TEXT
)
`,
).run();

db.prepare(
  ` CREATE TABLE IF NOT EXISTS user_algorithms (
  algorithm_id TEXT,
  user_id TEXT,
  status TEXT,
  reps INTEGER DEFAULT 0,
  pb_ms INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  last_practiced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, algorithm_id),
  FOREIGN KEY (algorithm_id) REFERENCES algorithms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)
`,
).run();

db.prepare(
  ` CREATE TABLE IF NOT EXISTS user_practice_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  algorithm_id TEXT,
  user_id TEXT,
  status TEXT, 
  time INTEGER DEFAULT 0,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (algorithm_id) REFERENCES algorithms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)
`,
).run();

// posts
db.prepare(
  `
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  algorithm_id TEXT,
  time_seconds INTEGER,
  notes TEXT,
  likes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`,
).run();
