"use client";

import { formatTime } from "@/lib/utils/formatting";
import { AlgorithmWithStatus } from "@/types/algorithm";
import { useRef, useState } from "react";

interface Props {
  alg: AlgorithmWithStatus;
  logPractice: (time: number) => Promise<{ reps: number; pb_ms: number }>;
}

export default function PracticeTimer({ alg, logPractice }: Props) {
  const [time, setTime] = useState(0); // milliseconds
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [userReps, setUserReps] = useState(alg.reps);
  const [userPB, setUserPB] = useState(alg.pb_ms);

  const startTimer = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = window.setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  return (
    <div className="card p-4 bg-base-100 shadow space-y-2 text-center">
      <h2 className="font-semibold">Timer</h2>
      <p className="text-3xl font-mono">{formatTime(time)}</p>
      <div className="flex justify-center gap-2 mt-2">
        <button className="btn btn-sm btn-primary" onClick={startTimer}>
          Start
        </button>
        <button className="btn btn-sm btn-warning" onClick={stopTimer}>
          Stop
        </button>
        <button className="btn btn-sm btn-accent" onClick={resetTimer}>
          Reset
        </button>
      </div>
      <p>PB: {userPB ? formatTime(userPB) : "N/A"}</p>
      <p>Reps: {userReps}</p>
      <button
        className="btn btn-sm btn-success mt-2"
        onClick={() => {
          logPractice(time).then((res) => {
            setUserPB(res.pb_ms);
            setUserReps(res.reps);
          });
        }}
      >
        Log Practice
      </button>
    </div>
  );
}
