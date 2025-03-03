"use client";

import React from "react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between bg-white p-md">
      <section>
        <Link href="/">
          <div className="h-[25px] w-[25px] rounded-full bg-first"></div>
        </Link>
      </section>
      <section></section>
    </nav>
  );
}
