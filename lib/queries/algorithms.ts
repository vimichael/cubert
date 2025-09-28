import {
  Algorithm,
  AlgorithmCategory,
  AlgorithmWithStatus,
} from "@/types/algorithm";
import { db } from "@/lib/db";

export function getAlgorithm(algorithm_id: string) {
  const row = db
    .prepare(
      `
select *
from algorithms
where id=?
`,
    )
    .get(algorithm_id) as Algorithm;

  return row;
}

export function getAlgorithmWithStats(userId: string, algorithmId: string) {
  const row = db
    .prepare(
      `
      SELECT *
       FROM algorithms a
       LEFT JOIN user_algorithms ua
         ON a.id = ua.algorithm_id AND ua.user_id = ? AND algorithm_id=?
       ORDER BY a.name
`,
    )
    .get(userId, algorithmId) as AlgorithmWithStatus;

  return row;
}

export function getAlgorithmCategory(category: AlgorithmCategory) {
  const rows = db
    .prepare(
      `
select *
from algorithms
where category=?
`,
    )
    .all(category) as Algorithm[];

  return rows;
}

export function getAlgorithmCategoryCount(category: AlgorithmCategory) {
  const row = db
    .prepare(
      `
select count(*) as cnt
from algorithms
where category=?
`,
    )
    .get(category) as { cnt: number };

  return row.cnt;
}

export function getAlgorithmCategoryWithUserStats(
  userId: string,
  category: AlgorithmCategory,
) {
  const rows = db
    .prepare(
      `
      SELECT
         a.id AS algorithm_id,
         a.name,
         a.category,
         COALESCE(ua.status, 'not started') AS status,
         COALESCE(ua.reps, 0) AS reps,
         COALESCE(ua.pb_ms, 0) AS pb_ms,
         ua.last_practiced_at
       FROM algorithms a
       LEFT JOIN user_algorithms ua
         ON a.id = ua.algorithm_id AND ua.user_id = ?
       WHERE a.category = ?
       ORDER BY a.name`,
    )
    .all(userId, category) as AlgorithmWithStatus[];

  return rows;
}
