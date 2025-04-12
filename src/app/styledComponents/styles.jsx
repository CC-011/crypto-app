"use client";
import style, {
    createGlobalStyle,
  } from "styled-components";
  
const MarketDataContainer = style.div`
display: flex;
justify-content: center;
gap: 20px;
`;
const darktheme = {
    red: "#B80C09",
    blue: "#0B4F6C",
    main: "#13121A",
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
      background: ${(props) => props.theme.main} ;
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
padding-right: 40px;
`;
const MarketDataExchange = style.div`
display: flex;
gap: 10px;
`;
const MarketDataCap = style.div`
display: flex;
gap: 10px;
padding-right: 40px;
`;
const MarketDataVolume = style.div`
display: flex;
gap: 10px;
`;
const MarketDataBtc = style.div`
display: flex;
gap: 10px;
`;
const MarketDataEth = style.div`
display: flex;
gap: 10px;
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
opacity: 0px;
`;

const Flex = style.div`
display: flex;
`;

const ContainerForTableChart = style.div`
display: flex;
justify-content: center;
`;

const Table = style.table`

`;

const TableCaption = style.caption`
font-size: 30px;
font-style: bold;
color: white;
`;

const Container = style.div`
    height: 6px;
    width: ${({ width }) => width}%;
    background-color: grey;
    position: relative;
    border-radius: 10px;
    margin: auto 0;
    overflow: hidden;
    border:none;
    margin-right: auto;
`;

const BaseBox = style.div`
    height: 100%;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 5px;
    border:none;
`;

const Progress = style(BaseBox)`
    background: rgba(0, 177, 167, 1);
    width: ${({ percent }) => percent}%;
    min-width: ${({ percent }) => percent < 2 ? "2" : percent}%;
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
    lightheme,
    Flex,
    Table,
    ContainerForTableChart,
    TableCaption,
    Progress,
    Container
 };