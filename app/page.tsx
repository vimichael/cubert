import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { Post } from "@/types/post";

// const PostCard = ({ post }: { post: Post }) => {
//   return <div>{post.notes}</div>;
// };

export default function Home() {
  const posts = db
    .prepare(
      `select id, user_id, algorithm_id, time_seconds, notes, created_at 
     from posts 
     order by created_at desc 
     limit 5`,
    )
    .all() as Post[];

  return (
    <div>
      <div>
        <button>Create Post</button>
      </div>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
