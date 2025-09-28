import { db } from "../lib/db";
import { v4 as uuid } from "uuid";

// Clear existing users
db.prepare("DELETE FROM users").run();

const users = [{ username: "SpeedCubingMike" }, { username: "CubeMasterAnna" }];

const insert = db.prepare(`
  INSERT INTO users (id, username)
  VALUES (@id, @username)
`);

for (const user of users) {
  insert.run({ id: uuid(), ...user });
}

console.log("Seeded users!");
