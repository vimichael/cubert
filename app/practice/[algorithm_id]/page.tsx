import { db } from "@/lib/db";
import { getAlgorithmWithStats } from "@/lib/queries/algorithms";
import { User } from "@/types/user";
import PracticeTimer from "./PracticeTimer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props {
  params: { algorithm_id: string };
}

export default async function Page({ params }: Props) {
  const { algorithm_id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div>
        <h1>You must be logged in to practice.</h1>
        <a href="/login?callbackUrl=/create-post">
          <button className="btn btn-primary">Log in</button>
        </a>
        <a href="/signup?callbackUrl=/create-post">
          <button className="btn btn-primary">Sign Up</button>
        </a>
      </div>
    );
  }

  const user = db
    .prepare(`select * from users where username='${session.user?.name}'`)
    .get() as User;
  const alg = getAlgorithmWithStats(user.id, algorithm_id);

  async function logPractice(time: number) {
    "use server";

    console.log("logging practice");

    const row = db
      .prepare(
        `
INSERT INTO user_algorithms (user_id, algorithm_id, reps, pb_ms, last_practiced_at, status)
VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP, 'learning')
ON CONFLICT(user_id, algorithm_id)
DO UPDATE SET
  reps = reps + 1,
  pb_ms = CASE
            WHEN ? IS NOT NULL AND (? < pb_ms OR pb_ms = 0) THEN ?
            ELSE pb_ms
          END,
  last_practiced_at = CURRENT_TIMESTAMP
RETURNING reps, pb_ms
`,
      )
      .get(user.id, algorithm_id, time, time, time, time) as {
      reps: number;
      pb_ms: number;
    };

    return row;
  }

  async function updateScore(val: number) {
    "use server";

    const result = db
      .prepare(
        "update user_algorithms set score=score + ? where algorithm_id=? returning score",
      )
      .get(val, alg.id) as { score: number };
    return result.score;
  }

  const initScore = (
    db
      .prepare("select score from user_algorithms where algorithm_id=? limit 1")
      .get(alg.id) as { score: number }
  ).score;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{alg.name}</h1>
        <span className="badge badge-primary">{alg.category}</span>
      </div>

      {/* Status */}
      <p className="text-sm text-gray-500">
        Status:{" "}
        <span
          className={
            alg.status === "mastered"
              ? "text-green-600"
              : alg.status === "learning"
                ? "text-yellow-600"
                : "text-gray-500"
          }
        >
          {alg.status}
        </span>
      </p>

      {/* Moves */}
      <div className="card p-4 bg-base-100 shadow">
        <h2 className="font-semibold mb-2">Algorithm Moves</h2>
        <p className="text-lg">{alg.moves}</p>
      </div>

      {/* Timer */}
      <PracticeTimer
        initScore={initScore}
        updateScore={updateScore}
        alg={alg}
        logPractice={logPractice}
      />

      {/* Description */}
      {alg.description && (
        <div className="card p-4 bg-base-100 shadow">
          <h2 className="font-semibold mb-1">Description</h2>
          <p>{alg.description}</p>
        </div>
      )}
    </div>
  );
}
