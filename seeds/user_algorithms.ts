import { Algorithm } from "@/types/algorithm";
import { db } from "../lib/db";
import { User } from "@/types/user";

// Fetch existing users
const users = db.prepare("SELECT id, username FROM users").all() as User[];
if (users.length === 0) throw new Error("No users found in the DB");

// Fetch some algorithms
const algorithms = db
  .prepare("SELECT id, name, category FROM algorithms")
  .all() as Algorithm[];
if (algorithms.length === 0) throw new Error("No algorithms found in the DB");

// Clear existing user_algorithms
db.prepare("DELETE FROM user_algorithms").run();

// Helper: randomly pick an algorithm
function pickRandomAlg(excludeIds: string[] = []) {
  const filtered = algorithms.filter((a) => !excludeIds.includes(a.id));
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Seed entries
const inserts: {
  user_id: string;
  algorithm_id: string;
  status: string;
  reps: number;
  pb_ms: number;
}[] = [];

users.forEach((user) => {
  const usedIds: string[] = [];

  // Give each user 2 algorithms
  for (let i = 0; i < 2; i++) {
    const alg = pickRandomAlg(usedIds);
    usedIds.push(alg.id);

    inserts.push({
      user_id: user.id,
      algorithm_id: alg.id,
      status: i === 0 ? "learning" : "mastered",
      reps: i === 0 ? 3 : 15,
      pb_ms: i === 0 ? 0 : 1800, // example: 1800ms
    });
  }
});

// Insert into DB
const insertStmt = db.prepare(`
  INSERT INTO user_algorithms (user_id, algorithm_id, status, reps, pb_ms)
  VALUES (@user_id, @algorithm_id, @status, @reps, @pb_ms)
`);

for (const entry of inserts) {
  insertStmt.run(entry);
}

console.log("user_algorithms seed complete!");
