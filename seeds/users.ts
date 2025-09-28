import { db } from "../lib/db";
import { v4 as uuid } from "uuid";
import { hashSync } from "bcrypt";

// Clear existing users
db.prepare("DELETE FROM users").run();

const users = [
  {
    username: "SpeedCubingMike",
    bio: "new speedcuber!",
    password: "someawesomepassword",
  },
  {
    username: "CubeMasterAnna",
    bio: "learning one-step PLL",
    password: "mysecretpassword",
  },
];

const insert = db.prepare(`
  INSERT INTO users (id, username, bio, hashed_password)
  VALUES (@id, @username, @bio, @hashed_password)
`);

for (const user of users) {
  const hashed_password = hashSync(user.password, 10);

  insert.run({
    id: uuid(),
    hashed_password: hashed_password,
    username: user.username,
    bio: user.bio,
  });
}

console.log("Seeded users!");
