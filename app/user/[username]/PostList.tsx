"use client";

import PostCard from "@/components/PostCard";
import { PostData } from "@/types/post_data";
import { useState } from "react";

interface Props {
  initPostData: PostData[];
  dbDeletePost: (id: string) => Promise<void>;
}

export function PostList({ initPostData, dbDeletePost }: Props) {
  const [postData, setPostData] = useState(initPostData);

  const onDeletePost = async (id: string) => {
    await dbDeletePost(id);
    setPostData((prev) => prev.filter((p) => p.post.id !== id));
  };

  return (
    <div className="w-full max-w-xl">
      <h3 className="text-2xl font-semibold mb-2 text-center">Posts</h3>
      {postData.map((post) => (
        <div key={post.post.id} className="space-y-4">
          <PostCard
            post={post.post}
            algorithm={post.algorithm}
            user={post.user}
            deletable={true}
            onDeletePost={onDeletePost}
          />
        </div>
      ))}
    </div>
  );
}
