"use client";

import React from "react";
import { init } from "@instantdb/react";
import schema from "../../instant.schema";
import { useRouter } from "next/navigation";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Auth() {
  const { isLoading, user, error } = db.useAuth();
  const [sentEmail, setSentEmail] = React.useState<string>("");
  const router = useRouter();

  React.useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  if (error) {
    console.log(error);
    return;
  }

  if (isLoading) return;

  return (
    <div className="grid h-full w-full place-items-center p-md md:p-lg">
      {sentEmail ? (
        <CodeStep sentEmail={sentEmail} />
      ) : (
        <EmailStep onSendEmail={setSentEmail} />
      )}
    </div>
  );
}

function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = inputRef.current!.value;

    onSendEmail(email);

    db.auth.sendMagicCode({ email }).catch((err) => {
      alert(err.body?.message);
      onSendEmail("");
    });
  };

  return (
    <form
      className="flex max-w-lg flex-col gap-sm"
      key="email"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-first">Let&apos;s log you in</h1>
      <p className="text-second">
        Enter your email, and we&apos;ll send you a verification code.
        We&apos;ll create an account for you too if you don&apos;t already have
        one!
      </p>
      <label className="mb-1 block text-sm text-fourth">Email</label>
      <input
        ref={inputRef}
        type="email"
        className="rounded bg-white p-sm py-[15px] text-first shadow-custom outline outline-fifth focus:outline-third md:px-md md:text-base"
        required
        autoFocus
      />
      <button
        type="submit"
        className="block rounded bg-first p-sm text-white md:text-base lg:duration-200 lg:hover:bg-second lg:hover:shadow-custom"
      >
        Send Code
      </button>
    </form>
  );
}

function CodeStep({ sentEmail }: { sentEmail: string }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = inputRef.current!.value;

    db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
      inputRef.current!.value = "";
      alert(err.body?.message);
    });
  };

  return (
    <form
      className="flex max-w-lg flex-col gap-sm"
      key="code"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold text-first">Enter your code</h1>
      <p className="text-second">
        We sent an email to <strong>{sentEmail}</strong>. Check your email, and
        paste the code you see.
      </p>
      <label className="mb-1.5 block text-sm text-fourth">Code</label>
      <input
        ref={inputRef}
        type="text"
        className="rounded bg-white p-sm py-[15px] text-first shadow-custom outline outline-fifth focus:outline-third md:px-md md:text-base"
        required
        autoFocus
      />
      <button
        type="submit"
        className="block rounded bg-first p-sm text-sm text-white md:text-base lg:duration-200 lg:hover:bg-second lg:hover:shadow-custom"
      >
        Verify Code
      </button>
    </form>
  );
}
