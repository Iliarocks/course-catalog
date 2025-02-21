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
    <div className="flex flex-col gap-sm md:max-w-screen-sm md:m-auto">
      <form>
        <label className="text-second text-xs" htmlFor="search">
          Search courses
        </label>
        <input
          id="search"
          className="mb-1.5 bg-fifth block shadow-custom bg-tertiary p-sm focus:outline-none text-xs text-first w-full rounded-sm"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <section className="flex flex-col gap-sm rounded-sm">
        {data.courses.map((course, index) => (
          <article
            key={index}
            className="rounded-sm shadow-custom border-fourth border p-sm"
          >
            <p>
              <span className="text-first">{course.subject} </span>
              <span className="text-second">{course.code}</span>
            </p>
            <p>
              <span className="text-third text-xs">{course.name}</span>
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
