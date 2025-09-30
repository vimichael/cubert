"use client";

interface Props {
  deletePost: () => Promise<void>;
}

export function DeleteButton({ deletePost }: Props) {
  return (
    <button className="hover:cursor-pointer" onClick={deletePost}>
      Delete
    </button>
  );
}
