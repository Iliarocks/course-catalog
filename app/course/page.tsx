"use client";

import React from "react";
import { init } from "@instantdb/react";
import schema from "../../instant.schema";
import { usePathname } from "next/navigation";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Auth() {
  const pathname = usePathname();
  const coursePath = pathname.split("/").pop();
  const courseSubject = coursePath!.substring(0, 4);
  const courseCode = coursePath!.substring(4, 8);

  const { isLoading, error, data } = db.useQuery({
    courses: {
      $: {
        where: {
          subject: courseSubject.toUpperCase(),
          code: courseCode,
        },
      },
    },
  });

  if (error) {
    console.log(error);
    return;
  }

  if (isLoading || !data || !data.courses || !data.courses[0]) return;

  const course = data.courses[0];

  return (
    <div className="flex h-full w-full flex-col">
      <section className="h-fit min-h-[150px] w-full bg-gradient-to-tr from-fifth from-40% via-third via-70% to-fifth to-100% shadow-custom">
        <header className="flex h-full w-full flex-col justify-center gap-xs p-md backdrop-blur-lg backdrop-brightness-105 backdrop-saturate-[0.75] md:gap-xs md:p-lg lg:px-[70px] lg:py-[50px]">
          <h1 className="text-xl font-semibold text-first md:text-3xl">
            {course.name}
          </h1>
          <h3 className="text-sm font-medium text-second md:text-base lg:text-lg">{`${course.subject} ${course.code} · ${course.credits} Credits`}</h3>
          <p className="text-xs text-fourth md:text-sm lg:text-base">
            {course.description}
          </p>
        </header>
      </section>
    </div>
  );
}
