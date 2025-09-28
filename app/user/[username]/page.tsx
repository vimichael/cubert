import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { User } from "@/types/user";

interface Props {
  params: { username: string };
}

export default function UserPage({ params }: Props) {
  const { username } = params;

  const user = db
    .prepare("select id, username, bio from users where username=?")
    .get(username) as User;

  const posts = db
    .prepare("select * from posts where user_id=? order by created_at desc")
    .all(user.id) as Post[];

  const isOwner = true;

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      {/* profile card */}
      <div className="card w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`}
                alt={user.username}
              />
            </div>
          </div>

          <h2 className="card-title text-2xl">{user.username}</h2>
          <p className="text-base-content/70">{user.bio || "No bio yet."}</p>

          {/* owner action btns */}
          {isOwner ? (
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">Edit Profile</button>
              <button className="btn btn-secondary">New Post</button>
            </div>
          ) : (
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-outline">Follow</button>
              <button className="btn btn-outline">Message</button>
            </div>
          )}
        </div>
      </div>

      {/* post section */}
      <div className="w-full max-w-xl">
        <h3 className="text-2xl font-semibold mb-2 text-center">Posts</h3>
        {posts.map((post) => (
          <div key={post.id} className="space-y-4">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
