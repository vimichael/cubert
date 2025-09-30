import { db } from "./db";

export function updateUserProfile(
  oldUsername: string,
  username: string,
  bio: string,
) {
  db.prepare(`update users set username=?, bio=? where username=?`).run(
    username,
    bio,
    oldUsername,
  );
}
