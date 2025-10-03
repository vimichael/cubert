import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";
import { PostList } from "./PostList";
import { getPostData } from "@/lib/post_data";
import { updateUserProfile } from "@/lib/profile";
import { Profile } from "./Profile";
import { likePost, unlikePost, userHasLikedPost } from "@/lib/posts";
import { userFollow, userFollowsOther, userUnfollow } from "@/lib/followers";

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

  let userFollowsProfile = false;
  if (viewerUser != null) {
    userFollowsProfile = await userFollowsOther(viewerUser.id, user.id);
  }

  return (
    <div className="flex flex-col items-center p-6 gap-6 bg-base-200">
      {/* profile card */}

      <Profile
        user={user}
        isOwner={isOwner || false}
        updateUser={updateUserProfileCb}
        onFollow={userFollowWrapper}
        onUnfollow={userUnfollowWrapper}
        initUserIsFollowing={userFollowsProfile}
      />

      {/* post section */}
      <PostList
        userHasLikedPost={userHasLikedPost}
        loggedInUserId={viewerUser == null ? undefined : viewerUser.id}
        initPostData={postData}
        dbDeletePost={dbDeletePost}
        likePost={likePost}
        unlikePost={unlikePost}
      />
    </div>
  );
}
