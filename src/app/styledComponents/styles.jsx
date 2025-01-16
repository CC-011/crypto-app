"use client";
import style, {
    createGlobalStyle,
  } from "styled-components";
  
const MarketDataContainer = style.div`
display: flex;
gap: 20px;
justify-content: center;
`;
const darktheme = {
    red: "#B80C09",
    blue: "#0B4F6C",
    main: "#040F16",
    secondary: "#FBFBFF"
  };
  
  const lightheme = {
    red: "#F8C7CC",
    blue: "#01A7C2",
    secondary: "#040F16",
    main: "#FBFBFF"
  };
  
  const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      background: ${(props) => props.theme.main};
    }
  
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    h1 {
      margin: 0;
    }
  
    * {
        font-family: sans-serif;
        color: ${(props) => props.theme.secondary};
    }
  `;
const MarketDataCoins = style.div`
display: flex;
`;
const MarketDataExchange = style.div`
display: flex;
`;
const MarketDataCap = style.div`
display: flex;
`;
const MarketDataVolume = style.div`
display: flex;
`;
const MarketDataBtc = style.div`
display: flex;
`;
const MarketDataEth = style.div`
display: flex;
`;

const NavbarContainer = style.div`
display: flex;
justify-content: space-between;
align-items: center;
padding-top: 20px;
height: "100px";
background: ${(props) => props.theme.main};
`;

const NavBarRight = style.div`
display: flex;
gap: 10px;
`;

const Text = style.h3`
font-size: 20px
`;

const NavBarLeft = style.div`
display: flex;
align-items: center;
gap: 10px;
`;

const Img = style.img`
width: 30px;
height: 25px; 
`;

const SearchBar = style.input`
width: 200px;
height: 40px;
padding: 8px 16px 8px 16px;
background: ${(props) => props.theme.main};
border-radius: 10px;
gap: 12px;
opacity: 0px;
`;

const Currency = style.div`
width: 40px;
height: 40px;
padding: 12px 16px 12px 16px;
gap: 4px;
border: solid white 1px;    
opacity: 0px;
`;
const ThemeButton = style.div`
width: 40px;
height: 40px;
top: 1px;
padding: 11px 0px 0px 0px;
gap: 10px;
border: solid white 1px;
opacity: 0px;
`;

const Profile = style.div`
width: 40px;
height: 40px;
gap: 0px;
border: solid white 1px;
opacity: 0px;
`;
export { 
    SearchBar, 
    Currency, 
    ThemeButton, 
    Profile, 
    NavbarContainer,
     NavBarRight, 
     Text, 
     NavBarLeft, 
     Img, 
     MarketDataContainer,
     MarketDataCoins,
     MarketDataExchange,
     MarketDataCap,
     MarketDataVolume,
     MarketDataBtc,
     MarketDataEth,
     GlobalStyle,
     darktheme,
     lightheme
 };