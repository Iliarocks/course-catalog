"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="h-screen flex flex-col justify-between p-[20px]">
      <section className="flex flex-col gap-[30px] items-center">
        <Link href="/">
          <div className="rounded-full h-[30px] w-[30px] bg-[#D9D9D9]"></div>
        </Link>
      </section>
      <section className="flex flex-col gap-[30px] items-center">
        <div className="rounded-full h-[30px] w-[30px] bg-[#D9D9D9]"></div>
        <div className="rounded-full h-[30px] w-[30px] bg-[#D9D9D9]"></div>
        <Link href="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base" />
        </Link>
      </section>
      <section className="flex flex-col gap-[30px] items-center">
        <Link href="/auth">
          <FontAwesomeIcon icon={faArrowRightToBracket} className="text-base" />
        </Link>
      </section>
    </nav>
  );
}
