import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";

export const metadata: Metadata = {
  title: "UBC Course Catalog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-md w-screen h-screen flex flex-col-reverse md:flex-row">
        <Navigation />
        <main className="grow p-md overflow-scroll">{children}</main>
      </body>
    </html>
  );
}
