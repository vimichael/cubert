"use client";

import { UserUpdateResult } from "@/lib/profile";
import { User } from "@/types/user";
import { useState } from "react";

interface Props {
  user: User;
  isOwner: boolean;
  updateUser: (username: string, bio: string) => Promise<UserUpdateResult>;
}

export function Profile({ user, isOwner, updateUser }: Props) {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState<string | null>(null);
  const oldUser = { ...user };

  async function action(_: FormData) {
    const result = await updateUser(username, bio);
    if (result != "success") {
      setError(result);
    } else {
      setEditing(false);
    }
  }

  return editing ? (
    <div className="card w-full max-w-xl bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${username}`}
              alt={username}
            />
          </div>
        </div>

        <form action={action}>
          <div className="form-control">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a unique username"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Professional speedcuber!"
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditing(false);
              setUsername(oldUser.username);
              setBio(oldUser.bio);
            }}
          >
            Cancel
          </button>

          {error && <p className="text-error">{error}</p>}
        </form>
      </div>
    </div>
  ) : (
    <div className="card w-full max-w-xl bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${username}`}
              alt={username}
            />
          </div>
        </div>

        <h2 className="card-title text-2xl">{username}</h2>
        <p className="text-base-content/70">{bio || "No bio yet."}</p>

        {/* owner action btns */}
        {isOwner ? (
          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => setEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline">Follow</button>
            <button className="btn btn-outline">Message</button>
          </div>
        )}
      </div>
    </div>
  );
}
