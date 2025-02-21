"use client";

import React from "react";

export default function Home() {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col gap-md">
        <h1 className="text-first text-5xl font-bold">
          Welcome to
          <br />
          <span className="text-second">UBCMatch</span>
        </h1>
        <p className="text-third">
          Feel free to search courses while we
          <br />
          work on getting other features ready!
        </p>
      </div>
    </div>
  );
}
