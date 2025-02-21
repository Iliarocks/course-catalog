"use client";

import React from "react";
import { init } from "@instantdb/react";
import schema from "../instant.schema";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Home() {
  return <main className="max-w-screen-sm m-auto">Home</main>;
}
