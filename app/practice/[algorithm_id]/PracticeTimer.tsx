"use client";

import { formatTime } from "@/lib/utils/formatting";
import { AlgorithmWithStatus } from "@/types/algorithm";
import { useEffect, useRef, useState } from "react";

interface Props {
  alg: AlgorithmWithStatus;
  logPractice: (time: number) => Promise<{ reps: number; pb_ms: number }>;
  initScore: number;
  addPractice: (time: number, passed: boolean) => Promise<number>;
}

export default function PracticeTimer({
  alg,
  logPractice,
  initScore,
  addPractice,
}: Props) {
  const [time, setTime] = useState(0); // milliseconds
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const holdStartRef = useRef<number | null>(null);
  const [userReps, setUserReps] = useState(alg.reps);
  const [userPB, setUserPB] = useState(alg.pb_ms);
  const [holding, setHolding] = useState(false);
  const [holdingDuration, setHoldingDuration] = useState(0); // milliseconds
  const [passFailAnswered, setPassFailAnswered] = useState(false);
  const [score, setScore] = useState(initScore);

  const startTimer = () => {
    if (running) return;
    setRunning(true);
    setPassFailAnswered(false);
    intervalRef.current = window.setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
  };

  useEffect(() => {
    if (!holding) return;

    const interval = window.setInterval(() => {
      setHoldingDuration(Date.now() - (holdStartRef.current ?? Date.now()));
    }, 10);

    return () => clearInterval(interval);
  }, [holding]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !holding && !running) {
        e.preventDefault();
        setHolding(true); // user is holding space
        holdStartRef.current = Date.now();
        setTime(0);
      } else if (e.code === "Space" && running) {
        // if timer is running, space stops it
        e.preventDefault();
        stopTimer();
        setHoldingDuration(0);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && holding && !running) {
        e.preventDefault();
        setHolding(false);
        const holdDuration = Date.now() - (holdStartRef.current ?? 0);
        // setHoldingDuration(holdDuration);
        // if holding for at least a second
        if (holdDuration >= 500) {
          startTimer();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [holding, running]);

  return (
    <div className="relative card p-4 bg-base-100 shadow space-y-2 text-center">
      <h2 className="text-xl absolute top-4 left-4">Score: {score}</h2>

      <h2 className="font-semibold">Timer</h2>
      <p
        className={`text-3xl font-mono ${getTimerColor(holding, holdingDuration)}`}
      >
        {formatTime(time)}
      </p>
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
      {time > 0 && !running ? (
        !passFailAnswered ? (
          <div className="flex flex-row justify-center items-center gap-3 w-full">
            <button
              className="flex-1 btn btn-sm btn-success mt-2"
              onClick={() => {
                setPassFailAnswered(true);
                logPractice(time).then(async (res) => {
                  setUserPB(res.pb_ms);
                  setUserReps(res.reps);
                  const s = await addPractice(time, true);
                  setScore(s);
                });
              }}
            >
              Pass
            </button>
            <button
              className="flex-1 btn btn-sm btn-error mt-2"
              onClick={async () => {
                setPassFailAnswered(true);
                const s = await addPractice(time, false);
                setScore(s);
              }}
            >
              Fail
            </button>
          </div>
        ) : (
          <div>
            {/* <h1>alg id: {JSON.stringify(alg)}</h1> */}
            <a
              href={`/create-post?time=${time}&algorithm_id=${encodeURIComponent(alg.id)}`}
            >
              <button className="btn btn-primary">Share your score</button>
            </a>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

const getTimerColor = (holding: boolean, holdingDuration: number) => {
  if (holdingDuration >= 500) {
    return "text-success";
  } else if (holding) {
    return "text-warning";
  }
  return "";
};
