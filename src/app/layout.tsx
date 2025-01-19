"use client";
import Link from "next/link";
import React, { useState } from "react";
import StoreProvider from "./StoreProvided";
import List from "./navbarComponent/navbar";
import { ThemeProvider } from "styled-components";
import {
  SearchBar,
  Currency,
  ThemeButton,
  Profile,
  NavbarContainer,
  NavBarRight,
  NavBarLeft,
  Img,
  GlobalStyle,
  lightheme,
  darktheme
} from "./styledComponents/styles";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const [Light, setLight] = useState(false);
  return (
    <html lang="en">
      <body>
      <StoreProvider>
        <ThemeProvider theme={Light ? lightheme : darktheme }>
          <GlobalStyle />
        <div>
          <List />
          <NavbarContainer>
            <NavBarRight>
              <Img src="https://i.ibb.co/f4HZnZF/Logoipsm.png">
              </Img>
              Logoisum
            </NavBarRight>
            <NavBarLeft>
              <SearchBar type="search" placeholder="search" />
              <Currency></Currency>
              <ThemeButton onClick={() => setLight(!Light)}>{Light ? "light" : "dark"}</ThemeButton>
              <Profile></Profile>
            </NavBarLeft>
          </NavbarContainer>
          <Link href="/"></Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/coins">Coins</Link> 
        </div>
        {children}
        </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}