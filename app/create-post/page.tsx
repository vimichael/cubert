import { createPost } from "@/lib/posts";
import CreatePostForm from "./CreatePostForm";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/types/user";
import { AuthBlockerMessage } from "@/components/AuthBlocker";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <AuthBlockerMessage message="You must be logged in to post." />;
  }

  const user = db
    .prepare(`select * from users where username=?`)
    .get(session.user?.name) as User;

  const algorithms = db.prepare("select id, name from algorithms").all() as {
    id: string;
    name: string;
  }[];

  async function createPostAction(formData: FormData) {
    "use server";

    console.log("creating post");

    const userId = (
      db
        .prepare(`select id from users where username='${user.username}'`)
        .get() as { id: string }
    ).id;

    const time = formData.get("time") as string;

    const id = formData.get("algorithm_id");
    console.log(`alg_id = ${id}`);

    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      userId: userId,
      algorithmId: formData.get("algorithm_id") as string,
      time_seconds: +time / 1000.0,
    };

    createPost(data);
  }

  return (
    <div className="bg-base-200 min-h-screen p-5 flex justify-center">
      <CreatePostForm action={createPostAction} algorithms={algorithms} />
    </div>
  );
}
