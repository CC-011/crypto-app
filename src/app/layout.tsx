import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div style={{ height: "100px", background: "red"}}>
        <div>
      <Link href="/"></Link>
      <Link href="/portfolio">Portfolio</Link>
        </div>
      <div>
      </div>
      </div>
      {children}
      </body>
    </html>
  );
}
