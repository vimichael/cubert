import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";
import { PostList } from "../../../components/PostList";
import { getPostData } from "@/lib/post_data";
import { updateUserProfile } from "@/lib/profile";
import { Profile } from "./Profile";
import { likePost, unlikePost, userHasLikedPost } from "@/lib/posts";
import { userFollow, userFollowsOther, userUnfollow } from "@/lib/followers";
import { PracticeLogs } from "@/components/PracticeLogs";
import { getPracticeLogs } from "@/lib/practice_logs";

interface Props {
  params: { username: string };
}

export default async function UserPage({ params }: Props) {
  const { username } = params;
  const session = await getServerSession(authOptions);

  const user = db
    .prepare("select * from users where username=?")
    .get(username) as User;

  const posts = db
    .prepare("select * from posts where user_id=? order by created_at desc")
    .all(user.id) as Post[];

  const viewerUser = db
    .prepare("select * from users where username=?")
    .get(session?.user?.name) as User;

  async function updateUserProfileCb(username: string, bio: string) {
    "use server";

    return updateUserProfile(user.username, username, bio);
  }

  let postData = getPostData(posts);

  const isOwner = session?.user && session?.user.name == username;

  async function dbDeletePost(id: string) {
    "use server";
    db.prepare("delete from posts where id=? limit 1").run(id);
  }

  async function userFollowWrapper(followingUserId: string) {
    "use server";
    if (viewerUser == null) {
      return;
    }

    userFollow(viewerUser.id, followingUserId);
  }

  async function userUnfollowWrapper(followingUserId: string) {
    "use server";
    if (viewerUser == null) {
      return;
    }

    userUnfollow(viewerUser.id, followingUserId);
  }

  async function getPage(start: number, count: number) {
    "use server";

    if (session?.user?.name == null) {
      return undefined;
    }

    return getPracticeLogs(session?.user?.name, start, count);
  }

  let userFollowsProfile = false;
  if (viewerUser != null) {
    userFollowsProfile = await userFollowsOther(viewerUser.id, user.id);
  }

  return (
    <div className="bg-base-200 w-full min-h-screen flex justify-center">
      <div className="flex flex-col w-full md:max-w-160 items-center p-6 gap-6 bg-base-200">
        {/* profile card */}

        <Profile
          user={user}
          isOwner={isOwner || false}
          updateUser={updateUserProfileCb}
          onFollow={userFollowWrapper}
          onUnfollow={userUnfollowWrapper}
          initUserIsFollowing={userFollowsProfile}
        />

        <div className="w-full p-2">
          <PracticeLogs
            fields={["name", "time", "status"]}
            getPage={getPage}
            paginated={false}
            pageCount={30}
          />
        </div>

        {/* post section */}
        <h3 className="text-2xl font-semibold mb-2 text-center">Posts</h3>
        <PostList
          userHasLikedPost={userHasLikedPost}
          loggedInUserId={viewerUser == null ? undefined : viewerUser.id}
          initPostData={postData}
          dbDeletePost={dbDeletePost}
          likePost={likePost}
          unlikePost={unlikePost}
          deletable={true}
        />
      </div>
    </div>
  );
}
