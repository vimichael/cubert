import { Post } from "@/types/post";
import { db } from "@/lib/db";
import { Algorithm } from "@/types/algorithm";
import { User } from "@/types/user";

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const algorithm = db
    .prepare("select name, moves, description from algorithms where id=?")
    .get(post.algorithm_id) as Algorithm;

  const user = db
    .prepare("select id, username from users where id=?")
    .get(post.user_id) as User;

  return (
    <div className="card w-full bg-base-100 shadow-md mb-4">
      <div className="card-body">
        {/* header content */}
        <div className="flex items-center gap-3 mb-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="/avatars/user1.png" alt="User avatar" />
            </div>
          </div>
          <div>
            <a href={`/user/${user.username}`}>
              <h3 className="font-semibold">{user.username}</h3>
            </a>
            <span className="text-sm text-gray-500">
              {post.created_at.toString()}
            </span>
          </div>
        </div>

        {/* content */}
        <p className="mb-3 whitespace-pre-line">{post.notes}</p>

        {/* title and alg */}
        <h2 className="card-title">
          T Perm <div className="badge badge-primary ml-2">PLL</div>
        </h2>
        <p className="text-sm text-gray-700">Algorithm: {algorithm.moves}</p>
        <p className="mt-2">{algorithm.description}</p>

        {/* post actions */}
        <div className="card-actions justify-between mt-4">
          <div className="flex gap-2">
            <button className="btn btn-sm">👍 Like</button>
            <button className="btn btn-sm">💬 Comment</button>
          </div>
          <button className="btn btn-sm btn-primary">Practice</button>
        </div>
      </div>
    </div>
  );
}
