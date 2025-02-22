"use client";

import React from "react";
import Searcher from "../components/searcher";

export default function Search() {
  const pageSize = 120;

  return (
    <div>
      <Searcher pageSize={pageSize} />
    </div>
  );
}
