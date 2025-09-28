import { createPost } from "@/lib/posts";
import CreatePostForm from "./CreatePostForm";
import { db } from "@/lib/db";

export default function Page() {
  const algorithms = db.prepare("select id, name from algorithms").all() as {
    id: string;
    name: string;
  }[];

  async function createPostAction(formData: FormData) {
    "use server";

    console.log("creating post");

    const userId = (
      db
        .prepare("select id from users where username='SpeedCubingMike'")
        .get() as { id: string }
    ).id;

    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      userId: userId,
      algorithmId: formData.get("algorithm_id") as string,
    };

    createPost(data);
  }

  return (
    <div>
      <h1>Create a Post</h1>

      <CreatePostForm action={createPostAction} algorithms={algorithms} />
    </div>
  );
}
