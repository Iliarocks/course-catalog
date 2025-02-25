"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faMagnifyingGlass,
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
    <nav className="h-ful flex w-full justify-between bg-white md:w-auto md:flex-col">
      {/* <section className="flex items-center gap-lg md:flex-col">
        <Link href="/">
          <img className="w-md" src="/logo.png"></img>
        </Link>
      </section>
      <section className="flex items-center gap-lg md:flex-col">
        <div className="h-lg w-lg rounded-full bg-second"></div>
        <div className="h-lg w-lg rounded-full bg-second"></div>
        <Link href="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base" />
        </Link>
      </section> */}
      <section className="flex items-center gap-lg md:flex-col">
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
              className="text-lg"
            />
          </a>
        ) : (
          <Link href="/auth">
            <FontAwesomeIcon icon={faArrowRightToBracket} className="text-lg" />
          </Link>
        )}
      </section>
    </nav>
  );
}
