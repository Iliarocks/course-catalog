"use client";

import React from "react";
import Search from "./search/page";

export default function Home() {
  return (
    <div className="h-full">
      <div className="md:max-w-2xl m-auto flex flex-col gap-sm">
        <h1 className="text-first text-5xl font-bold md:min-w-2xl">
          Welcome to
          <br />
          <span className="text-second">UBCMatch</span>
        </h1>
        <p className="text-third">
          Feel free to search courses while we
          <br />
          work on getting other features ready!
        </p>
        <Search />
      </div>
    </div>
  );
}
