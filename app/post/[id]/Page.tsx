import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { getPostData } from "@/lib/post_data";
import { likePost, unlikePost, userHasLikedPost } from "@/lib/posts";
import { Post } from "@/types/post";
import { Props } from "./page";

export default async function Page({ params }: Props) {
  const { id } = await params;

  const post = db.prepare("select * from posts where id=?").get(id) as
    | Post
    | undefined;

  if (post == null) {
    return (
      <div className="min-h-screen">
        <h1>Post not found.</h1>
      </div>
    );
  }

  let postData = getPostData([post]);

  return (
    <div className="min-h-screen bg-base-200">
      <PostCard
        deletable={false}
        post={postData[0].post}
        algorithm={postData[0].algorithm}
        user={postData[0].user}
        onLike={likePost}
        onUnlike={unlikePost}
        userHasLikedPost={userHasLikedPost}
        loggedInUserId={userId}
      />
    </div>
  );
}
