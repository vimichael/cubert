import PostCard from "@/components/PostCard";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPostData } from "@/lib/post_data";
import { likePost, unlikePost, userHasLikedPost } from "@/lib/posts";
import { Post } from "@/types/post";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  let userId: string | undefined = undefined;
  if (session != null && session.user != null) {
    const row = db
      .prepare("select id from users where username=?")
      .get(session.user.name) as { id: string } | undefined;
    if (row) {
      userId = row.id;
    }
  }

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
    <div className="min-h-screen bg-base-200 p-5 flex justify-center w-full">
      <div className="flex-1 md:max-w-160">
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
    </div>
  );
}
