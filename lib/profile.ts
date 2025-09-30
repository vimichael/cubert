import { db } from "./db";

export type UserUpdateResult = "success" | "Username taken";

export function updateUserProfile(
  oldUsername: string,
  username: string,
  bio: string,
): UserUpdateResult {
  if (oldUsername != username) {
    const row = db
      .prepare("select * from users where username=?")
      .run(username);
    if (row) {
      return "Username taken";
    }
  }

  db.prepare(`update users set username=?, bio=? where username=?`).run(
    username,
    bio,
    oldUsername,
  );

  return "success";
}
