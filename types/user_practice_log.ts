export interface UserPracticeLog {
  id: number;
  algorithm_id: string;
  user_id: string;
  status: string;
  time: number;
}

// practice log with the algorithm name included
export interface NamedUserPracticeLog {
  id: number;
  algorithm_id: string;
  user_id: string;
  status: string;
  time: number;
  name: string;
  category: string;
}
