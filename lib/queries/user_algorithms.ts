import { AlgorithmWithStatus } from "@/types/algorithm";
import { db } from "../db";

export function getUserAlgorithmCount(userId: string, category: string) {
  const row = db
    .prepare(
      `
select count(*) as cnt
from user_algorithms
join algorithms on user_algorithms.algorithm_id = algorithms.id
where user_algorithms.user_id = ? and algorithms.category = ?
`,
    )
    .get(userId, category) as { cnt: number };

  return row.cnt as number;
}

export function getUserLearningAlgorithmCount(
  userId: string,
  category: string,
) {
  const row = db
    .prepare(
      `
select count(*) as cnt
from user_algorithms
join algorithms on user_algorithms.algorithm_id = algorithms.id
where user_algorithms.user_id = ? and algorithms.category = ? and status='learning'
`,
    )
    .get(userId, category) as { cnt: number };

  return row.cnt as number;
}

export function getUserMasteredAlgorithmCount(
  userId: string,
  category: string,
) {
  const row = db
    .prepare(
      `
select count(*) as cnt
from user_algorithms
join algorithms on user_algorithms.algorithm_id = algorithms.id
where user_algorithms.user_id = ? and algorithms.category = ? and status='mastered'
`,
    )
    .get(userId, category) as { cnt: number };

  return row.cnt as number;
}

export function getUserAlgorithms(userId: string) {
  const row = db
    .prepare(
      `
select *
from user_algorithms
join algorithms on user_algorithms.algorithm_id = algorithms.id
where user_id=?
`,
    )
    .all(userId) as AlgorithmWithStatus[];

  return row;
}
