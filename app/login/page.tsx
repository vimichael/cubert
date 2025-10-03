"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError("Invalid login");
    }
  }

  return (
    <div className="max-w-128 mx-auto rounded-box p-5 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="card w-full p-6 shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

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
          Log In
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
