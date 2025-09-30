"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  action: (formData: FormData) => Promise<void>;
  algorithms: { id: string; name: string }[];
}

export default function CreatePostForm({ action, algorithms }: Props) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  // Prefilled state
  const [content, setContent] = useState("");
  const [algorithmId, setAlgorithmId] = useState("");
  const [pbMs, setPbMs] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const pbParam = searchParams.get("time");
    const algoParam = searchParams.get("algorithm_id");

    if (pbParam) setPbMs(pbParam);
    if (algoParam) setAlgorithmId(algoParam);
  }, [searchParams]);

  const actionWrapper = async (formData: FormData) => {
    setLoading(true);
    try {
      await action(formData);
      setSuccess(true);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <form
      action={actionWrapper}
      className="flex-1 h-fit card card-sm bg-base-100 shadow-md p-6 shadow space-y-4 max-w-120 mx-auto"
    >
      <h2 className="text-xl font-bold">Create a Post</h2>

      {/* Content */}
      <div className="form-control flex flex-col w-full">
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea
          name="content"
          className="textarea textarea-bordered w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
        />
      </div>

      {/* Algorithm dropdown */}
      <div className="form-control flex flex-col w-full">
        <label className="label">
          <span className="label-text">Algorithm</span>
        </label>
        <select
          // name="algorithm_id"
          className="select select-bordered w-full"
          required
          value={algorithmId}
          disabled
          onChange={(e) => setAlgorithmId(e.target.value)}
        >
          <option value="">-- Select an algorithm --</option>
          {algorithms.map((algo) => (
            <option key={algo.id} value={algo.id}>
              {algo.name}
            </option>
          ))}
        </select>
      </div>

      <input type="hidden" name="algorithm_id" value={algorithmId} />

      {/* the time it took */}
      <div className="form-control flex flex-col w-full">
        <label className="label">
          <span className="label-text">Time</span>
        </label>
        <input
          type="number"
          name="time"
          className="input input-bordered w-full"
          min="0"
          required
          value={pbMs}
          disabled
          onChange={(e) => setPbMs(e.target.value)}
        />
      </div>

      {/* Submit button */}
      {submitted ? (
        <></>
      ) : (
        <button
          type="submit"
          className={`btn btn-primary ${loading ? "loading" : ""}`}
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>
      )}

      {success && <p className="text-green-600">Post created successfully!</p>}
    </form>
  );
}
