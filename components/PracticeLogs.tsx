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

export function PracticeLogs({ paginated, getPage, pageCount, fields }: Props) {
  const [logNumber, setLogNumber] = useState(0);
  const [logs, setLogs] = useState<NamedUserPracticeLog[] | null>(null);

  useEffect(() => {
    getPage(logNumber, pageCount)
      .then((logs) => {
        if (logs == null) {
          setLogs([]);
          return;
        } else {
          setLogs(logs);
        }
      })
      .then((_) => setLogNumber((prev) => prev + pageCount));
  }, []);

  if (logs == null) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="loading loading-spinner loading-xl"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-scroll bg-base-100 card card-sm shadow-md">
      <h1 className="text-center p-3">Practice Logs</h1>
      <table className="table w-full">
        <thead>
          <tr>
            {fields.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-y-scroll">
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
