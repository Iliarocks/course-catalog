"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
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
    <nav className="bg-white w-screen bottom-0 flex justify-between p-md md:w-auto md:flex-col md:h-screen">
      <section className="flex gap-lg items-center md:flex-col">
        <Link href="/">
          <img className="w-md" src="/logo.png"></img>
        </Link>
      </section>
      <section className="flex gap-lg items-center md:flex-col">
        <div className="rounded-full h-lg w-lg bg-second"></div>
        <div className="rounded-full h-lg w-lg bg-second"></div>
        <Link href="/search">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-base"
            color="#415A77"
          />
        </Link>
      </section>
      <section className="flex gap-lg items-center md:flex-col">
        {user ? (
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              db.auth.signOut();
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-base"
              color="#415A77"
            />
          </a>
        ) : (
          <Link href="/auth">
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              className="text-base"
              color="#415A77"
            />
          </Link>
        )}
      </section>
    </nav>
  );
}
