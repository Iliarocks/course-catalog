import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UBC Course Catalog",
  description: "Alternative UBC Course Catalog Made by Ilia Parunashvili",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh w-dvw font-sans">{children}</body>
      {/* <body className="flex h-dvh w-dvw flex-col bg-white font-sans text-sm">
        <Navigation />
        <main className="h-full w-full grow overflow-hidden">{children}</main>
      </body> */}
    </html>
  );
}
