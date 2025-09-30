import { Post } from "@/types/post";
import { db } from "./db";
import { User } from "@/types/user";
import { Algorithm } from "@/types/algorithm";
import { PostData } from "@/types/post_data";

export function getPostData(posts: Post[]) {
  let postData: PostData[] = [];
  for (let post of posts) {
    const algorithm = db
      .prepare("select * from algorithms where id=?")
      .get(post.algorithm_id) as Algorithm;

    const user = db
      .prepare("select id, username from users where id=?")
      .get(post.user_id) as User;

    postData.push({
      post: post,
      algorithm: algorithm,
      user: user,
    });
  }
  return postData;
}
