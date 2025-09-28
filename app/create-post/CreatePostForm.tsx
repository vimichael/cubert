"use client";

import { useState } from "react";

interface Props {
  action: (formData: FormData) => Promise<void>;
  algorithms: { id: string; name: string }[];
}

export default function CreatePostForm({ action, algorithms }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const actionWrapper = async (formData: FormData) => {
    setLoading(true);
    action(formData).then(() => {
      setLoading(false);
      setSuccess(true);
    });
  };

  return (
    <form action={actionWrapper} className="card p-6 shadow space-y-4">
      <h2 className="text-xl font-bold">Create a Post</h2>

      {/* Content */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea
          name="content"
          className="textarea textarea-bordered"
          required
        />
      </div>

      {/* Algorithm dropdown */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Algorithm</span>
        </label>
        <select name="algorithm_id" className="select select-bordered" required>
          <option value="">-- Select an algorithm --</option>
          {algorithms.map((algo) => (
            <option key={algo.id} value={algo.id}>
              {algo.name}
            </option>
          ))}
        </select>
      </div>

      {/* Personal best time (ms) */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Personal Best (ms)</span>
        </label>
        <input
          type="number"
          name="pb_ms"
          className="input input-bordered"
          min="0"
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {loading ? "Submitting..." : "Create Post"}
      </button>

      {success && <p className="text-green-600">Post created successfully!</p>}
    </form>
  );
}
