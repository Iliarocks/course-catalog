"use client";

import React from "react";
import { init } from "@instantdb/react";
import schema from "../../instant.schema";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Search() {
  const pageSize = 120;
  const [search, setSearch] = React.useState<string>("");

  const { isLoading, error, data } = db.useQuery({
    courses: {
      $: {
        where: {
          or: [
            { subject: { $ilike: `%${search}%` } },
            { code: { $ilike: `%${search}%` } },
            { name: { $ilike: `%${search}%` } },
          ],
        },
        limit: pageSize,
      },
    },
  });

  if (error) {
    console.log(error);
    return;
  }

  if (isLoading || !data || !data.courses) return;

  return (
    <div className="max-w-screen-sm m-auto">
      <input
        className="mb-1.5 block bg-tertiary p-3 focus:outline-none text-xs text-primary w-full rounded-md"
        type="search"
        placeholder="Search courses..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <section className="flex flex-col gap-xs-gutter p-[5px]">
        {data.courses.map((course, index) => (
          <article key={index} className="mb-2">
            <p>
              <span className="text-primary">{course.subject} </span>
              <span className="text-secondary">{course.code}</span>
            </p>
            <p>
              <span className="text-secondary text-xs">{course.name}</span>
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
