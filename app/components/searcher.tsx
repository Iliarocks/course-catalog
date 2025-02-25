import React from "react";
import { init } from "@instantdb/react";
import schema from "../../instant.schema";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Searcher({ pageSize }: { pageSize: number }) {
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
    <div className="flex h-full w-full flex-col gap-sm">
      <form
        className="flex flex-col gap-xs"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="text-second" htmlFor="search">
          Search courses
        </label>
        <input
          id="search"
          className="bg-tertiary mb-1.5 block w-full rounded-sm bg-fifth p-sm text-sm text-first shadow-custom focus:outline-none md:text-lg"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </form>
      <section className="flex w-full flex-col gap-sm rounded-sm">
        {data.courses.map((course, index) => (
          <article
            key={index}
            className="rounded-sm border border-fourth p-sm shadow-custom"
          >
            <p>
              <span className="text-first">{course.subject} </span>
              <span className="text-second">{course.code}</span>
            </p>
            <p>
              <span className="text-sm text-third md:text-base">
                {course.name}
              </span>
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
