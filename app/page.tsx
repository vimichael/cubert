import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { Algorithm } from "@/types/algorithm";
import { getPostData } from "@/lib/post_data";

// const PostCard = ({ post }: { post: Post }) => {
//   return <div>{post.notes}</div>;
// };

export default function Home() {
  const posts = db
    .prepare(
      `select *
     from posts 
     order by created_at desc 
     limit 5`,
    )
    .all() as Post[];

  let postData = getPostData(posts);

  return (
    <div>
      <div className="p-5">
        {postData.map(({ post, user, algorithm }) => (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            algorithm={algorithm}
            deletable={false}
          />
        ))}
      </div>
    </div>
  );
}
