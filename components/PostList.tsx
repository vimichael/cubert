"use client";

import PostCard from "@/components/PostCard";
import { PostData } from "@/types/post_data";
import { useState } from "react";

interface Props {
  initPostData: PostData[];
  dbDeletePost: (id: string) => Promise<void>;
  likePost: (userId: string, postId: string) => Promise<number>;
  unlikePost: (userId: string, postId: string) => Promise<number>;
  userHasLikedPost: (user_id: string, post_id: string) => Promise<boolean>;
  loggedInUserId?: string;
}

export function PostList({
  initPostData,
  dbDeletePost,
  likePost,
  unlikePost,
  loggedInUserId,
  userHasLikedPost,
}: Props) {
  const [postData, setPostData] = useState(initPostData);

  const onDeletePost = async (id: string) => {
    await dbDeletePost(id);
    setPostData((prev) => prev.filter((p) => p.post.id !== id));
  };

  return (
    <div className="w-full">
      {postData.map((post) => (
        <div key={post.post.id} className="space-y-4">
          <PostCard
            loggedInUserId={loggedInUserId}
            userHasLikedPost={userHasLikedPost}
            onLike={likePost}
            onUnlike={unlikePost}
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
