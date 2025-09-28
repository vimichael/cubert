import { db } from "@/lib/db";
import {
  getAlgorithmCategoryCount,
  getAlgorithmCategoryWithUserStats,
} from "@/lib/queries/algorithms";
import {
  getUserAlgorithmCount,
  getUserAlgorithms,
  getUserLearningAlgorithmCount,
  getUserMasteredAlgorithmCount,
} from "@/lib/queries/user_algorithms";
import { percent } from "@/lib/utils/formatting";
import { AlgorithmCategory, AlgorithmWithStatus } from "@/types/algorithm";
import { User } from "@/types/user";

const AlgorithmProgressCard = ({
  userId,
  category,
}: {
  userId: string;
  category: AlgorithmCategory;
}) => {
  const title = category;
  const learning = getUserLearningAlgorithmCount(userId, category);
  const mastered = getUserMasteredAlgorithmCount(userId, category);
  const total = getAlgorithmCategoryCount(category);
  const notStarted = total - mastered - learning;

  return (
    <div key={title} className="stats shadow flex-1">
      <div className="stat">
        <div className="stat-title">{title} Learned</div>
        <div className="stat-value">
          {mastered} / {total}
        </div>
        <div className="stat-desc">
          Mastered: {mastered} | Learning: {learning} | Not started:{" "}
          {notStarted}
        </div>
      </div>
    </div>
  );
};

interface Props {
  algorithm: AlgorithmWithStatus;
}

const AlgorithmCard = ({ algorithm }: Props) => {
  // Choose background color based on status
  const statusColor =
    algorithm.status === "mastered"
      ? "bg-success"
      : algorithm.status === "learning"
        ? "bg-warning"
        : "bg-base-100";

  return (
    <a
      href={`/practice/${algorithm.algorithm_id}`}
      className={`block p-4 rounded-md shadow ${statusColor} hover:shadow-lg transition`}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold">{algorithm.name}</h3>
        <span className="text-sm font-semibold capitalize">
          {algorithm.status}
        </span>
      </div>

      <div className="flex justify-between items-center mb-1">
        <div className="text-xs text-gray-600">
          Reps: {algorithm.reps} | PB: {algorithm.pb_ms} ms
        </div>
        <button className="btn btn-sm btn-primary">Practice</button>
      </div>
    </a>
  );
};

const AlgorithmList = ({
  userId,
  category,
}: {
  userId: string;
  category: AlgorithmCategory;
}) => {
  const algorithms = getAlgorithmCategoryWithUserStats(userId, category);

  return (
    <div className="flex flex-col gap-4 p-3">
      {algorithms.map((alg) => (
        <AlgorithmCard key={alg.algorithm_id} algorithm={alg} />
      ))}
    </div>
  );
};

export default function Page() {
  const userRow = db
    .prepare(`select * from users where username='SpeedCubingMike'`)
    .get() as User;
  if (!userRow) {
    return <h1>unknown user</h1>;
  }
  const userId = userRow.id;

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
      <h1 className="text-2xl text-center font-bold">Training Dashboard</h1>

      <div className="flex gap-4">
        <AlgorithmProgressCard userId={userId} category="F2L" />
        <AlgorithmProgressCard userId={userId} category="OLL" />
        <AlgorithmProgressCard userId={userId} category="PLL" />
      </div>

      <div className="grid grid-cols-3">
        <AlgorithmList userId={userId} category="F2L" />
        <AlgorithmList userId={userId} category="OLL" />
        <AlgorithmList userId={userId} category="PLL" />
      </div>
    </div>
  );
}
