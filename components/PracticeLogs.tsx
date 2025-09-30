"use client";

import { NamedUserPracticeLog } from "@/types/user_practice_log";
import { useEffect, useState } from "react";

interface Props {
  paginated: boolean;
  getPage: (
    start: number,
    count: number,
  ) => Promise<NamedUserPracticeLog[] | undefined>;
  pageCount: number;
  fields: string[];
}

// interface DisplayLog {
//   name: string;
//   time: number;
// }
//
// function convertLogs(logs: NamedUserPracticeLog[]) {
//   let displayLogs = [];
//   for (let log of logs) {
//   }
// }

export function PracticeLogs({ paginated, getPage, pageCount, fields }: Props) {
  const [logNumber, setLogNumber] = useState(0);
  const [logs, setLogs] = useState<NamedUserPracticeLog[]>([]);

  useEffect(() => {
    getPage(logNumber, pageCount)
      .then((logs) => {
        if (logs == null) {
          return;
        } else {
          setLogs(logs);
        }
      })
      .then((_) => setLogNumber((prev) => prev + pageCount));
  }, []);

  if (logs.length == 0) {
    return (
      <div>
        <div className="loading loading-spinner loading-xl"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-scroll bg-base-100 card card-sm shadow-md">
      <table className="table">
        <thead>
          <tr>
            {fields.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              {fields.map((field) =>
                field == "status" ? (
                  <td
                    key={field}
                    className={` text-black ${log.status == "passed" ? "bg-success" : "bg-error"}`}
                  >
                    {(log as Record<string, any>)[field] as string}
                  </td>
                ) : (
                  <td key={field}>
                    {(log as Record<string, any>)[field] as string}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
