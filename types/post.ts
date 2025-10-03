export interface Post {
  id: string;
  user_id: string;
  algorithm_id: string;
  time_seconds: number;
  notes: string;
  created_at: Date;
  likes: number;
}
