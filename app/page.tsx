"use client";

import React from "react";
import Searcher from "./components/searcher";

export default function Home() {
  const pageSize = 50;
  const [search, setSearch] = React.useState<string>("");
  const [level, setLevel] = React.useState<string>("");
  const [credits, setCredits] = React.useState<string>("");

  return (
    <div className="flex h-full w-full flex-col">
      <section className="h-fit w-full bg-gradient-to-br from-fifth from-40% via-third via-70% to-fifth to-100% shadow-custom">
        <header className="flex h-full w-full flex-col justify-center gap-xs p-md backdrop-blur-lg backdrop-brightness-105 backdrop-saturate-50 md:gap-sm md:p-lg lg:px-[70px] lg:py-[50px]">
          <h1 className="text-xl font-semibold text-first md:text-3xl">
            Find courses
          </h1>
          <div className="flex flex-col gap-xs lg:flex-row lg:gap-sm">
            <input
              className="w-full rounded bg-white p-sm py-[15px] text-first shadow-custom focus:outline focus:outline-third md:px-md md:text-base lg:w-[768px]"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <div className="flex gap-xs text-xs font-medium text-first md:text-sm lg:gap-sm">
              <select
                className="w-fit rounded bg-white p-sm shadow-custom md:px-md lg:text-base lg:hover:cursor-pointer"
                name="level"
                id="level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Level</option>
                <option value="1">100</option>
                <option value="2">200</option>
                <option value="3">300</option>
                <option value="4">400</option>
                <option value="5">500</option>
                <option value="6">600</option>
              </select>
              <select
                className="w-fit rounded bg-white p-sm shadow-custom md:px-md lg:text-base lg:hover:cursor-pointer"
                name="credit"
                id="credit"
                onChange={(e) => setCredits(e.target.value)}
              >
                <option value="">Credits</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </header>
      </section>
      <section className="grow overflow-y-scroll">
        <Searcher
          limit={pageSize}
          search={search}
          level={level}
          credits={credits}
        />
      </section>
    </div>
  );
}
