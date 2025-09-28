import Database from "better-sqlite3";
import { join } from "path";

export const db = new Database(join(process.cwd(), "cubert.db"));

// users table
db.prepare(
  `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT,
  bio TEXT,
  hashed_password TEXT
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
  last_practiced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, algorithm_id),
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
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`,
).run();
