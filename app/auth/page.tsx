"use client";

import React from "react";
import { init } from "@instantdb/react";
import schema from "../../instant.schema";

const db = init({ appId: "d61474bf-3716-48ff-a937-160d78848b7f", schema });

export default function Auth() {
  const { isLoading, user, error } = db.useAuth();
  const [sentEmail, setSentEmail] = React.useState<string>("");

  React.useEffect(() => {
    document.location.href = "/";
  }, [user]);

  if (isLoading) return;

  if (error) {
    console.log(error);
    return;
  }

  if (sentEmail) return <CodeStep sentEmail={sentEmail} />;

  return <EmailStep onSendEmail={setSentEmail} />;
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
    <form key="email" onSubmit={handleSubmit}>
      <label className="mb-1.5 block text-xs text-secondary">
        Let&apos;s log in
      </label>
      <input
        ref={inputRef}
        type="email"
        className="mb-1.5 block bg-tertiary p-1.5 text-xs text-primary"
        required
        autoFocus
      />
      <button
        type="submit"
        className="block bg-tertiary p-1.5 text-xs text-primary"
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
    <form key="email" onSubmit={handleSubmit}>
      <label className="mb-1.5 block text-xs text-secondary">Magic code</label>
      <input
        ref={inputRef}
        type="text"
        className="mb-1.5 block bg-tertiary p-1.5 text-xs text-primary"
        required
        autoFocus
      />
      <button
        type="submit"
        className="block bg-tertiary p-1.5 text-xs text-primary"
      >
        Log in
      </button>
    </form>
  );
}
