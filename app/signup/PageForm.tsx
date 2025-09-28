"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

interface Props {
  action: (username: string, password: string) => Promise<string | null>;
}

export default function PageForm({ action }: Props) {
  const [error, setError] = useState("");

  async function actionWrapper(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const err = await action(username, password);

    if (err) {
      setError(err);
      return;
    }
    // log user in
    const res = await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/",
    });
    if (res?.error) {
      setError("invalid login");
    }
  }

  return (
    <form action={actionWrapper} className="card w-full p-6 shadow space-y-4">
      <h2 className="text-xl font-bold">Signup</h2>

      <input
        name="username"
        type="text"
        placeholder="Username"
        className="input input-bordered w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
      />

      <button className="btn btn-primary w-full" type="submit">
        Signup
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
