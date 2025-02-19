"use client";

import React from "react";
import { init, InstantObject } from "@instantdb/react";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f" });

export default function Home() {
  const [search, setSearch] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<InstantObject[]>([]);

  const query = React.useMemo(() => {
    return {
      courses: {
        $: {
          where: {
            or: [
              { subject: { $ilike: `%${search}%` } },
              { code: { $ilike: `%${search}%` } },
              { name: { $ilike: `%${search}%` } },
            ],
          },
        },
      },
    };
  }, [search]);

  const { isLoading, error, data } = db.useQuery(query);

  React.useEffect(() => {
    console.log({ isLoading, error, data });
    if (!(isLoading || error) && data) {
      setResult(data.courses);
    }
  }, [isLoading, error, data]);

  return (
    <main className="max-w-screen-sm m-auto">
      <input
        className="mb-1.5 block bg-tertiary p-1.5 text-xs text-primary w-full"
        type="search"
        onChange={(e) => setSearch(e.target.value ? e.target.value : null)}
      />
      <ul>
        {result.map((course, i) => (
          <li key={i} className="mb-2">
            <p className="truncate">
              <span className="text-primary">{course.subject} </span>
              <span className="text-secondarytext-primary">{course.code}</span>
            </p>
            <p>
              <span className="text-secondary text-xs">{course.name}</span>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
