"use client";

import React from "react";
import { init } from "@instantdb/react";
import schema from "../instant.schema";
import Navigation from "./components/Navigation";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Home() {
  const { userIsLoading, user, userError } = db.useAuth();

  if (userIsLoading) return; // come back and handle loading state

  if (userError) return; // come back and handle error

  return (
    <div className="flex h-full w-full flex-col">
      <Navigation user={user} />
    </div>
  );
}
