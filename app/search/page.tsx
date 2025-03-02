"use client";

import React from "react";
import Searcher from "../components/searcher";

export default function Search() {
  const pageSize = 100;
  const [search, setSearch] = React.useState<string>("");

  return (
    <div className="flex h-full w-full flex-col">
      <section className="bg-fifth px-md py-lg">
        <form
          className="flex max-w-screen-lg flex-col gap-md md:m-auto"
          autoComplete="off"
        >
          <label className="text-3xl font-bold text-third" htmlFor="search">
            Find Courses
          </label>
          <input
            className="shadow-cutsom rounded-md p-md text-lg text-first outline-none"
            id="search"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </form>
      </section>
      <section className="h-full w-full max-w-screen-lg md:m-auto">
        <Searcher limit={pageSize} search={search} />
      </section>
    </div>
  );
}
