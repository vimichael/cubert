import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { getPostData } from "@/lib/post_data";
import { PracticeLogs } from "@/components/PracticeLogs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPracticeLogs } from "@/lib/practice_logs";
import { likePost, unlikePost, userHasLikedPost } from "@/lib/posts";

// const PostCard = ({ post }: { post: Post }) => {
//   return <div>{post.notes}</div>;
// };

export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts = db
    .prepare(
      `select *
     from posts 
     order by created_at desc 
     limit 5`,
    )
    .all() as Post[];

  let postData = getPostData(posts);

  async function getPage(start: number, count: number) {
    "use server";

    if (session?.user?.name == null) {
      return undefined;
    }

    return getPracticeLogs(session?.user?.name, start, count);
  }

  return (
    <div>
      <div className="p-5 bg-base-200 min-h-screen">
        <div className="flex flex-row justify-center gap-3 mx-auto">
          <div className="flex-1 flex flex-col max-w-160">
            {postData.map(({ post, user, algorithm }) => (
              <PostCard
                key={post.id}
                post={post}
                user={user}
                algorithm={algorithm}
                deletable={false}
                onLike={likePost}
                onUnlike={unlikePost}
                userHasLikedPost={userHasLikedPost}
                loggedInUserId={user.id}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="card w-72 bg-base-100 card-sm shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Want to post?</h2>
                <p>Practice an algorithm and share your results!</p>
                <div className="justify-end card-actions">
                  <a href="/training">
                    <button className="btn btn-primary btn-sm">
                      Go to Training
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {session != null && (
              <div className="w-72">
                <PracticeLogs
                  fields={["name", "time", "status"]}
                  paginated={false}
                  pageCount={5}
                  getPage={getPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
