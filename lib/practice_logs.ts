import { User } from "@/types/user";
import { db } from "./db";
import { NamedUserPracticeLog } from "@/types/user_practice_log";

export async function getPracticeLogs(
  username: string,
  start: number,
  count: number,
) {
  "use server";

  const user = db
    .prepare("select * from users where username=?")
    .get(username) as User;

  const row = db
    .prepare(
      "select pl.*, a.name, a.category from user_practice_logs pl join algorithms a on pl.algorithm_id = a.id where user_id=? limit ? offset ?",
    )
    .all(user.id, count, start) as NamedUserPracticeLog[];

  return row;
}
