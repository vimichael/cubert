import { db } from "./db";

export async function userFollow(userId: string, followingUserId: string) {
  db.prepare(
    "insert into user_following (user_id, following_user_id) values (?, ?)",
  ).run(userId, followingUserId);
  db.prepare("update users set followers=followers+1 where id=?").run(
    followingUserId,
  );
  db.prepare("update users set following=following+1 where id=?").run(userId);
}

export async function userUnfollow(userId: string, followingUserId: string) {
  db.prepare(
    "delete from user_following where user_id=? and following_user_id=?",
  ).run(userId, followingUserId);
  db.prepare("update users set followers=followers-1 where id=?").run(
    followingUserId,
  );
  db.prepare("update users set following=following-1 where id=?").run(userId);
}

export async function userFollowsOther(
  userId: string,
  followingUserId: string,
) {
  const row = db
    .prepare(
      "select * from user_following where user_id=? and following_user_id=? limit 1",
    )
    .get(userId, followingUserId);
  if (row == null) {
    return false;
  }
  return true;
}
