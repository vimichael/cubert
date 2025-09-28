import { signIn } from "next-auth/react";
import PageForm from "./PageForm";
import { db } from "@/lib/db";
import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";

export default function SignupPage() {
  async function action(username: string, password: string) {
    "use server";

    // const username = formData.get("username") as string;
    // const password = formData.get("password") as string;

    // ensure username is not already used
    const userExists = db
      .prepare("select * from users where username=? limit 1")
      .get(username);
    if (userExists) {
      return "Username is already in use.";
    }

    // create user
    db.prepare(
      "insert into users (id, username, hashed_password) values (?, ?, ?)",
    ).run(uuid(), username, hashSync(password, 10));

    return null;
  }

  return <PageForm action={action} />;
}
