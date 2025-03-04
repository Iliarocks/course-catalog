"use client";

import React from "react";
import Logo from "./Logo";

const homeButton = (
  <button>
    <Logo className="text-first hover:text-second size-7 duration-200 lg:size-6" />
  </button>
);

const logOutButton = (
  <button className="bg-first hover:bg-second rounded-xs px-7 py-2 font-medium text-white shadow-xs duration-150 hover:shadow-sm">
    Sign out
  </button>
);

const logInButton = (
  <button className="bg-first hover:bg-second rounded-xs px-7 py-2 font-medium text-white shadow-xs duration-150 hover:shadow-sm">
    Log in
  </button>
);

export default function Navigation({ user }) {
  return (
    <nav className="border-fifth flex h-20 w-full items-center justify-between border-b-1 px-4 lg:px-10">
      {homeButton}
      {user ? logOutButton : logInButton}
    </nav>
  );
}
