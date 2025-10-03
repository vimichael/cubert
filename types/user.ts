export interface User {
  id: string;
  username: string;
  bio: string;
  hashed_password: string;
  followers: number;
  following: number;
}
