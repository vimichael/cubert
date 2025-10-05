import { AuthBlockerMessage } from "@/components/AuthBlocker";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  getAlgorithmCategoryCount,
  getAlgorithmCategoryWithUserStats,
} from "@/lib/queries/algorithms";
import {
  getUserLearningAlgorithmCount,
  getUserMasteredAlgorithmCount,
} from "@/lib/queries/user_algorithms";
import { AlgorithmCategory, AlgorithmWithStatus } from "@/types/algorithm";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";

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
    <div key={title} className="stats shadow flex-1 bg-base-100">
      <div className="stat">
        <div className="stat-title">{title} Mastered</div>
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
      href={`/practice/${algorithm.id}`}
      className={`flex rounded-md shadow hover:shadow-lg bg-base-100 transition`}
    >
      <div className={`w-3 h-full rounded-l-md ${statusColor}`}></div>

      <div className="flex-1 p-4 w-full">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold">
            {algorithm.name} {algorithm.score}/100
          </h3>
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
    <div className="flex flex-col gap-4 p-3 w-full max-h-230 overflow-y-scroll">
      {algorithms.map((alg) => (
        <AlgorithmCard key={alg.id} algorithm={alg} />
      ))}
    </div>
  );
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <AuthBlockerMessage
        redirect="/training"
        message="You must login to start training."
      />
    );
  }

  const userRow = db
    .prepare(`select * from users where username='${session.user?.name}'`)
    .get() as User;
  if (!userRow) {
    return <h1>unknown user</h1>;
  }
  const userId = userRow.id;

  return (
    <div className="p-6 space-y-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl text-center font-bold">Training Dashboard</h1>

      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row gap-3 md:max-w-full">
          <div className="flex flex-col justify-start w-full">
            <div className="flex-0 p-3 w-full">
              <AlgorithmProgressCard userId={userId} category="F2L" />
            </div>
            <div className="flex-1 w-full">
              <AlgorithmList userId={userId} category="F2L" />
            </div>
          </div>

          <div className="flex flex-col justify-start w-full">
            <div className="flex-0 p-3">
              <AlgorithmProgressCard userId={userId} category="OLL" />
            </div>
            <div className="flex-1">
              <AlgorithmList userId={userId} category="OLL" />
            </div>
          </div>

          <div className="flex flex-col justify-start w-full">
            <div className="flex-0 p-3">
              <AlgorithmProgressCard userId={userId} category="PLL" />
            </div>
            <div className="flex-1">
              <AlgorithmList userId={userId} category="PLL" />
            </div>
          </div>

          <div className="grid grid-cols-3 w-full"></div>
        </div>
      </div>
    </div>
  );
}
