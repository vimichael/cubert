import { db } from "../lib/db";
import { Algorithm } from "../types/algorithm";
import { User } from "../types/user";
import { v4 as uuid } from "uuid";

// Clear existing posts
db.prepare("DELETE FROM posts").run();

// Fetch seeded users and algorithms
const users = db.prepare("SELECT * FROM users").all() as User[];
const algorithms = db.prepare("SELECT * FROM algorithms").all() as Algorithm[];

// Create two posts per user about different algorithms
const posts: any[] = [];

for (const user of users) {
  for (let i = 0; i < 2; i++) {
    const algo = algorithms[i % algorithms.length];
    posts.push({
      id: uuid(),
      user_id: user.id,
      algorithm_id: algo.id,
      time_seconds: Math.floor(Math.random() * 30) + 10, // random time 10-40s
      notes: `Practiced ${algo.name}, felt improvement!`,
    });
  }
}

const insert = db.prepare(`
  INSERT INTO posts (id, user_id, algorithm_id, time_seconds, notes)
  VALUES (@id, @user_id, @algorithm_id, @time_seconds, @notes)
`);

for (const post of posts) {
  insert.run({ id: uuid(), ...post });
}

console.log("Seeded posts!");
