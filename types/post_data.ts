import { User } from "./user";
import { Post } from "./post";
import { Algorithm } from "./algorithm";

export interface PostData {
  post: Post;
  user: User;
  algorithm: Algorithm;
}
