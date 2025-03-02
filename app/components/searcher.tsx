import React from "react";
import { init } from "@instantdb/react";
import schema from "../../instant.schema";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Searcher({
  limit,
  search,
  level,
}: {
  limit: number;
  search: string;
  level: string;
}) {
  const { isLoading, error, data } = db.useQuery({
    courses: {
      $: {
        where: {
          or: [
            { subject: { $ilike: `%${search}%` } },
            { code: { $ilike: `%${search}%` } },
            { name: { $ilike: `%${search}%` } },
          ],
          // and: [{ code: { $like: `${level}%` } }],
        },
        limit: limit,
      },
    },
  });

  if (error) {
    console.log(error);
    return;
  }

  if (isLoading || !data || !data.courses) return;

  return (
    <ul className="flex h-full w-full flex-col gap-sm overflow-y-scroll p-md">
      {data.courses.map((course, index) => (
        <article
          key={index}
          className="flex flex-col gap-xs rounded border-2 border-fifth p-sm shadow-custom"
        >
          <div className="flex w-full justify-between">
            <div className="max-w-[80%]">
              <p className="text-xs text-first">{`${course.subject} ${course.code}`}</p>
              <p className="text-2xs truncate text-second">{`${course.name}`}</p>
              <p className="text-2xs text-fourth">{`${course.credits} Credits`}</p>
            </div>
            <div className="grid h-fit w-fit place-items-center rounded bg-fifth p-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-fourth"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
          </div>
          <p className="text-2xs line-clamp-2 text-fourth">{`${course.description}`}</p>
        </article>
      ))}
    </ul>
  );
}
