"use client";

import { Post } from "@/types/post";
import { Algorithm } from "@/types/algorithm";
import { User } from "@/types/user";
import { DeleteButton } from "./DeleteButton";
import { useState } from "react";

interface PostProps {
  post: Post;
  algorithm: Algorithm;
  user: User;
  deletable: boolean;
  onDeletePost?: (id: string) => Promise<void>;
  onLike: (id: string) => Promise<number>;
  onUnlike: (id: string) => Promise<number>;
}

export default function PostCard({
  post,
  deletable = false,
  algorithm,
  user,
  onDeletePost,
  onLike,
  onUnlike,
}: PostProps) {
  const [likes, setLikes] = useState(post.likes);
  const liked = false;

  async function handleLike() {
    let newLikeVal = 0;
    if (liked) {
      newLikeVal = await onUnlike(post.id);
    } else {
      newLikeVal = await onLike(post.id);
    }
    setLikes(newLikeVal);
  }

  return (
    <div className="card w-full bg-base-100 shadow-md mb-4">
      <div className="card-body">
        {/* header content */}
        <div className="w-full flex justify-between items-center gap-3 mb-2">
          <div className="flex items-center gap-5">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`}
                  alt={user.username}
                />
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

          {deletable && onDeletePost != undefined && (
            <DeleteButton deletePost={() => onDeletePost(post.id)} />
          )}
        </div>

        {/* content */}
        <a href={`/post/${post.id}`} className="hover:cursor-pointer">
          <p className="mb-3 whitespace-pre-line">{post.notes}</p>
        </a>

        {/* title and alg */}
        <h2 className="card-title">
          T Perm <div className="badge badge-primary ml-2">PLL</div>
        </h2>
        <p className="text-sm text-gray-700">Algorithm: {algorithm.moves}</p>
        <p className="mt-2">{algorithm.description}</p>

        {/* post actions */}
        <div className="card-actions justify-between mt-4">
          <div className="flex gap-2">
            <button onClick={handleLike} className="btn btn-sm">
              👍 Like {likes}
            </button>
          </div>
          <a href={`/practice/${algorithm.id}`}>
            <button className="btn btn-sm btn-primary">Practice</button>
          </a>
        </div>
      </div>
    </div>
  );
}
