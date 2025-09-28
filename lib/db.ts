import Database from "better-sqlite3";
import { join } from "path";

export const db = new Database(join(process.cwd(), "cubert.db"));

// Users table (optional for MVP)
db.prepare(
  `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT
)
`,
).run();

// Algorithms table
db.prepare(
  `
CREATE TABLE IF NOT EXISTS algorithms (
  id TEXT PRIMARY KEY,
  name TEXT,
  moves TEXT,
  description TEXT
)
`,
).run();

// Posts / practice logs table
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
