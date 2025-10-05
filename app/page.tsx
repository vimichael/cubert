import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { getPostData } from "@/lib/post_data";
import { PracticeLogs } from "@/components/PracticeLogs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPracticeLogs } from "@/lib/practice_logs";
import {
  getFollowingPosts,
  getPosts,
  likePost,
  unlikePost,
  userHasLikedPost,
} from "@/lib/posts";
import { PostList } from "@/components/PostList";

export default async function Home() {
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

  const posts = await getPosts(0, 5);

  let followingPosts: Post[] = [];
  if (userId != null) {
    followingPosts = await getFollowingPosts(userId, 0, 5);
  }
  // // const posts = db
  // //   .prepare(
  // //     `select *
  // //    from posts
  // //    order by created_at desc
  // //    limit 5`,
  // //   )
  // //   .all() as Post[];
  //
  // const followingPosts = db
  //   .prepare(
  //     `SELECT p.*
  //    FROM posts p
  //    JOIN user_following uf
  //      ON p.user_id = uf.following_user_id
  //    WHERE uf.user_id = ?
  //    ORDER BY p.created_at DESC
  //    LIMIT 5`,
  //   )
  //   .all(userId) as Post[];

  let postData = getPostData(posts);
  let followingPostData = getPostData(followingPosts);

  async function getPage(start: number, count: number) {
    "use server";

    if (session?.user?.name == null) {
      return undefined;
    }

    return getPracticeLogs(session?.user?.name, start, count);
  }

  async function dbDeletePost(id: string) {
    "use server";
    db.prepare("delete from posts where id=? limit 1").run(id);
  }

  return (
    <div>
      <div className="p-5 bg-base-200 min-h-screen">
        <div className="flex flex-col md:flex-row justify-center gap-3 mx-auto">
          <div className="flex-1 flex flex-col w-full md:max-w-160">
            {userId == null ? (
              <PostList
                userHasLikedPost={userHasLikedPost}
                loggedInUserId={userId}
                initPostData={postData}
                dbDeletePost={dbDeletePost}
                likePost={likePost}
                unlikePost={unlikePost}
                deletable={false}
              />
            ) : (
              <div className="tabs tabs-border">
                <input
                  type="radio"
                  name="my_tabs_6"
                  className="tab"
                  aria-label="All"
                  defaultChecked
                />

                <div className="tab-content">
                  <PostList
                    userHasLikedPost={userHasLikedPost}
                    loggedInUserId={userId}
                    initPostData={postData}
                    dbDeletePost={dbDeletePost}
                    likePost={likePost}
                    unlikePost={unlikePost}
                    deletable={false}
                  />
                </div>

                <input
                  type="radio"
                  name="my_tabs_6"
                  className="tab"
                  aria-label="Following"
                />
                <div className="tab-content">
                  <PostList
                    userHasLikedPost={userHasLikedPost}
                    loggedInUserId={userId}
                    initPostData={followingPostData}
                    dbDeletePost={dbDeletePost}
                    likePost={likePost}
                    unlikePost={unlikePost}
                  />
                </div>
              </div>
            )}
            {/* name of each tab group should be unique */}
          </div>
          <div className="hidden md:flex flex-col gap-3 mt-10">
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
