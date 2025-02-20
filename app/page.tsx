"use client";

import React from "react";
import { init, InstaQLEntity } from "@instantdb/react";
import schema, { AppSchema } from "../instant.schema";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

type Course = InstaQLEntity<AppSchema, "courses">;
type Cursor = [string, string, object, number];

export default function Home() {
  const pageSize = 15;

  const [query, setQuery] = React.useState<string>("");
  const [results, setResults] = React.useState<Course[]>([]);
  const [cursors, setCursors] = React.useState<{
    after?: Cursor;
    first: number;
  }>({
    first: pageSize,
  });

  const { error, data, pageInfo } = db.useQuery({
    courses: {
      $: {
        where: {
          or: [
            { subject: { $ilike: `%${query}%` } },
            { code: { $ilike: `%${query}%` } },
            { name: { $ilike: `%${query}%` } },
          ],
        },
        ...cursors,
      },
    },
  });

  React.useEffect(() => {
    setResults([]);
    setCursors({ first: pageSize });
  }, [query]);

  React.useEffect(() => {
    if (data) setResults((previous) => [...previous, ...(data.courses || [])]);
  }, [data]);

  function loadMore() {
    const endCursor = pageInfo?.courses?.endCursor;
    if (endCursor) {
      setCursors({ after: endCursor, first: pageSize });
    }
  }

  if (error) return;

  return (
    <main className="max-w-screen-sm m-auto">
      <input
        className="mb-1.5 block bg-tertiary p-1.5 text-xs text-primary w-full"
        type="search"
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.map((course, i) => (
        <article key={i} className="mb-2">
          <p>
            <span className="text-primary">{course.subject} </span>
            <span className="text-secondarytext-primary">{course.code}</span>
          </p>
          <p>
            <span className="text-secondary text-xs">{course.name}</span>
          </p>
        </article>
      ))}
      <button onClick={loadMore}>Load More</button>
    </main>
  );
}
