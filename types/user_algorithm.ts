type UserAlgorithmStatus = "learning" | "mastered";

export interface UserAlgorithm {
  algorithm_id: string;
  user_id: string;
  status: UserAlgorithmStatus;
  reps: number;
  pb_ms: number;
  last_practiced_at: Date;
}
