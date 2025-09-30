import { v4 as uuid } from "uuid";
import { db } from "./db";

export async function createPost(data: {
  content: string;
  userId: string;
  algorithmId: string;
  time_seconds: number;
}) {
  const id = uuid();
  db.prepare(
    `insert into posts (id, user_id, notes, algorithm_id, created_at, time_seconds)
    values (?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
`,
  ).run(id, data.userId, data.content, data.algorithmId, data.time_seconds);

  return { id, ...data };
}

export async function likePost(id: string) {
  "use server";

  const row = db
    .prepare("update posts set likes=likes+1 where id=? returning likes")
    .get(id) as { likes: number } | undefined;

  if (!row) {
    console.log("failed to update likes");
    return 0;
  }

  return row.likes;
}

export async function unlikePost(id: string) {
  "use server";

  const row = db
    .prepare("update posts set likes=likes-1 where id=? returning likes")
    .get(id) as { likes: number } | undefined;

  if (!row) {
    console.log("failed to update likes");
    return 0;
  }

  return row.likes;
}

export async function userHasLikedPost(user_id: string, post_id: string) {
  "use server";

  const row = db
    .prepare("select * from user_likes where user_id=? and post_id=? limit 1")
    .get(user_id, post_id);

  // if row is null, then user has not liked post yet
  if (row == null) {
    return false;
  }

  return true;
}
