"use client";

import React from "react";
import Link from "next/link";
import { init } from "@instantdb/react";
import schema from "../../instant.schema";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Navigation() {
  const { isLoading, user, error } = db.useAuth();

  if (isLoading) return;

  if (error) {
    console.log(error);
    return;
  }

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
