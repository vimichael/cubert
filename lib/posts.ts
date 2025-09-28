import { v4 as uuid } from "uuid";
import { db } from "./db";

export async function createPost(data: {
  content: string;
  userId: string;
  algorithmId: string;
}) {
  const id = uuid();
  db.prepare(
    `insert into posts (id, user_id, notes, algorithm_id, created_at)
    values (?, ?, ?, ?, CURRENT_TIMESTAMP)
`,
  ).run(id, data.userId, data.content, data.algorithmId);

  return { id, ...data };
}
