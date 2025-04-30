"use client";
import React from "react";
import StoreProvider from "./StoreProvided";
import List from "./navbarComponent/navbar";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Theme } from "./navbarComponent/theme-settings";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <ThemeProvider attribute="class" disableTransitionOnChange>
              <div>
                <List />
                <div className="coinLandingPageContainer">
                  <Theme />
                </div>
              </div>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
