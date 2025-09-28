import { db } from "@/lib/db";
import {
  getUserAlgorithmCount,
  getUserAlgorithms,
} from "@/lib/queries/user_algorithms";
import { User } from "@/types/user";

export default function Page() {
  const userRow = db
    .prepare(`select * from users where username='SpeedCubingMike'`)
    .get() as User;
  if (!userRow) {
    return <h1>unknown user</h1>;
  }
  const userId = userRow.id;

  const userOLLCount = getUserAlgorithmCount(userId, "OLL");
  const userPLLCount = getUserAlgorithmCount(userId, "PLL");
  const algorithms = getUserAlgorithms(userId);

  // const userOllCount = (
  //   db
  //     .prepare(
  //       `select count(*) as cnt
  //     from user_algorithms
  //     join algorithms on user_algorithms.algorithm_id = algorithms.id
  //     where category='OLL' and user_id=?`,
  //     )
  //     .get(userId) as { cnt: number }
  // ).cnt;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Training Dashboard</h1>

      {/* Stats section */}
      <div className="flex gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">OLL Learned</div>
            <div className="stat-value">{userOLLCount}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">PLL Learned</div>
            <div className="stat-value">{userPLLCount}</div>
          </div>
        </div>
      </div>

      {/* Algorithm cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {algorithms.map((alg) => (
          <div key={alg.algorithm_id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{alg.name}</h2>
              <p className="text-sm text-gray-500">Category: {alg.category}</p>
              <p>
                Status: <span className="font-semibold">{alg.status}</span>
              </p>
              <p>Reps: {alg.reps}</p>
              <p>PB: {alg.pb_ms} ms</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
