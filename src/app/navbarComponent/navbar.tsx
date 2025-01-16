"use client";
import StoreProvider from "../StoreProvided";
import { useAppDispatch } from "../lib/hooks";
import React, { useEffect} from "react";
import {  marketDataCap } from "../marketdata/marketdatacap";
import { RootState } from "../lib/store";
import { useSelector } from "react-redux";
import {
  MarketDataContainer,
  MarketDataCoins,
  MarketDataExchange,
  MarketDataCap,
  MarketDataVolume,
  MarketDataBtc,
  MarketDataEth,
} from "../styledComponents/styles";

interface Coins {
  coin: number; 
}

const LoadData = ({ coin }: Coins) => {
  return <div>{coin}</div>; 
};

interface NestedCoins {
  coin: Record<string, any> | undefined; 
  nestedCoin: string[]; 
}

const LoadNestedCoins = ({ coin, nestedCoin }: NestedCoins) => {
  const getNestedValue = (obj: any, path: string[]): any => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  };

  const nestedValue = getNestedValue(coin, nestedCoin);
  return <div>{nestedValue !== null ? nestedValue : "Value not found"}</div>;
};

function List() {
  const dispatch = useAppDispatch();

  const { data } = useSelector((state: RootState) => state.market);
  
  useEffect(() => {
    dispatch(marketDataCap());
  }, [dispatch]);

  return (
    <div>
      <StoreProvider>
        <MarketDataContainer>
          <MarketDataCoins>
            Coins: <LoadData coin={data?.active_cryptocurrencies ?? 0} />
          </MarketDataCoins>
          <MarketDataExchange></MarketDataExchange>
          <MarketDataCap>
            Market Cap:{" "}
            <LoadNestedCoins coin={data?.total_market_cap} nestedCoin={["sek"]} />
          </MarketDataCap>
          <MarketDataVolume>
            BTC: <LoadNestedCoins coin={data?.market_cap_percentage} nestedCoin={["btc"]} />
          </MarketDataVolume>
          <MarketDataBtc></MarketDataBtc>
          <MarketDataEth>
            ETH: <LoadNestedCoins coin={data?.market_cap_percentage} nestedCoin={["eth"]} />
          </MarketDataEth>
        </MarketDataContainer>
      </StoreProvider>
    </div>
  );
}

export default List;
