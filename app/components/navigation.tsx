"use client";

import React from "react";

const logo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6 text-first"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
    />
  </svg>
);

const signedInButton = <button>Sign out</button>;

const signedOutButton = <button>Sign in</button>;

export default function Navigation({ user }) {
  return (
    <nav className="border-1 flex h-20 w-full items-center justify-between px-4 lg:px-10">
      <button>{logo}</button>
      <ul>
        <li>{user ? signedInButton : signedOutButton}</li>
      </ul>
    </nav>
    // <nav className="flex justify-between bg-white p-md md:px-lg">
    //   <section>
    //     <Link href="/">{logo}</Link>
    //   </section>
    //   <section>
    //     {user ? (
    //       <button
    //         className="text-xs font-medium text-first md:text-sm lg:duration-100 lg:hover:scale-105"
    //         onClick={() => db.auth.signOut()}
    //       >
    //         Sign out
    //       </button>
    //     ) : (
    //       <Link
    //         className="text-xs font-medium text-first md:text-sm lg:duration-100 lg:hover:scale-105"
    //         href="/auth"
    //       >
    //         Sign in
    //       </Link>
    //     )}
    //   </section>
    // </nav>
  );
}
