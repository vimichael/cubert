import { db } from "@/lib/db";
import { getAlgorithmWithStats } from "@/lib/queries/algorithms";
import { User } from "@/types/user";

interface Props {
  params: { algorithm_id: string };
}

export default function Page({ params }: Props) {
  const user = db
    .prepare(`select * from users where username='SpeedCubingMike'`)
    .get() as User;
  const alg = getAlgorithmWithStats(user.id, params.algorithm_id);

  return (
    <div>
      <h1>{alg.name}</h1>
      <p>{alg.status}</p>
      <p>{alg.moves}</p>
    </div>
  );
}
