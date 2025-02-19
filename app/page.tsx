"use client";

import React from "react";
import { init, InstantObject } from "@instantdb/react";
import InfiniteScroll from "react-infinite-scroller";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f" });

export default function Home() {
  const pageSize = 15;

  const [search, setSearch] = React.useState<string>("");
  const [result, setResult] = React.useState<InstantObject[]>([]);
  const [cursors, setCursors] = React.useState({ first: pageSize });

  React.useEffect(() => {
    setResult([]);
    setCursors({ first: pageSize });
  }, [search]);

  const query = {
    courses: {
      $: {
        where: {
          or: [
            { subject: { $ilike: `%${search}%` } },
            { code: { $ilike: `%${search}%` } },
            { name: { $ilike: `%${search}%` } },
          ],
        },
        ...cursors,
      },
    },
  };

  const { isLoading, error, data, pageInfo } = db.useQuery(query);

  React.useEffect(() => {
    if (!isLoading && !error && data) {
      setResult((prev) => [...prev, ...data.courses]);
    }
  }, [isLoading, error, data]);

  const loadNextPage = () => {
    const endCursor = pageInfo?.courses?.endCursor;
    console.log(endCursor);
    if (endCursor) {
      setCursors({ after: endCursor, first: pageSize });
    }
    if (!isLoading && !error && data) {
      setResult((prev) => [...prev, ...data.courses]);
    }
  };

  return (
    <main className="max-w-screen-sm m-auto">
      <input
        className="mb-1.5 block bg-tertiary p-1.5 text-xs text-primary w-full"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadNextPage}
        hasMore={pageInfo?.courses?.endCursor ? true : false}
        loader={<div key={0}>Loading ...</div>}
      >
        {result.map((course, i) => (
          <article key={i} className="mb-2">
            <p className="truncate">
              <span className="text-primary">{course.subject} </span>
              <span className="text-secondarytext-primary">{course.code}</span>
            </p>
            <p>
              <span className="text-secondary text-xs">{course.name}</span>
            </p>
          </article>
        ))}
      </InfiniteScroll>
    </main>
  );
}
