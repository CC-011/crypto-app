"use client";
import Link from "next/link";
import React from "react";
import StoreProvider from "./StoreProvided";
import List from "./navbarComponent/navbar";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Theme } from "./navbarComponent/theme-settings";
import { Card } from "@/components/ui/card";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <div>
              <List />
              <div className="coinLandingPageContainer">
                <Theme />
              </div>
              <div className="coinsButton">
                <div className="coinLandingPage">
                  <Card>
                    <Link href="/coins">Coins</Link>
                  </Card>
                </div>
              </div>
            </div>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
