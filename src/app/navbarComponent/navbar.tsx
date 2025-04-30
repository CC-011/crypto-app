"use client";
import { useAppDispatch } from "../lib/hooks";
import React, { useEffect } from "react";
import { marketDataCap } from "../marketdata/marketdatacap";
import { RootState } from "../lib/store";
import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";
import { ShowMarketNumbersInCompactForm } from "../Utils/formatNumbers";
import { Card } from "@/components/ui/card";

interface Coins {
  coin: number;
}

const LoadData = ({ coin }: Coins) => {
  return <div>{coin}</div>;
};

interface barPercentage {
  number: number;
}

function ProgressCustom({ number }: barPercentage) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(number), 500);
    return () => clearTimeout(timer);
  }, [number]);

  return <Progress value={progress} className="w-[60%]" />;
}

function List() {
  const dispatch = useAppDispatch();

  const { data } = useSelector((state: RootState) => state.market);
  useEffect(() => {
    dispatch(marketDataCap());
  }, [dispatch]);
  return (
    <Card>
      <Card className="bg-navbar topDisplayBar navbar-container">
        <Card className="navbarCoinGap flex">
          <Card className="lightningBoltContainer">
            <Card>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z" />
              </svg>
            </Card>
          </Card>
          Coins: <LoadData coin={data?.active_cryptocurrencies ?? 0} />
        </Card>
        <Card className="flex navbar-gap">
          <>
            {data ? (
              <>
                {data?.total_market_cap?.usd >= 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#00FC2A"
                    viewBox="0 0 24 24"
                    strokeWidth={0}
                    stroke="currentColor"
                    className="size-6"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />{" "}
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FE1040"
                    viewBox="0 0 24 24"
                    strokeWidth={0}
                    stroke="currentColor"
                    className="size-6"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />{" "}
                  </svg>
                )}
              </>
            ) : (
              0
            )}
          </>
          <ShowMarketNumbersInCompactForm
            marketNumbers={data ? data?.total_market_cap?.usd : 0}
          />
        </Card>
        <Card className="flex navbar-gap">
          {" "}
          <p>
            <ShowMarketNumbersInCompactForm
              marketNumbers={data ? data?.total_volume?.usd : 0}
            />
          </p>
          <div className="firstProgressBar">
            <ProgressCustom
              number={
                data?.total_volume?.usd && data?.total_market_cap?.usd
                  ? Math.min(
                      100,
                      Math.max(
                        0,
                        (data.total_volume.usd / data.total_market_cap.usd) *
                          100
                      )
                    )
                  : 0
              }
            />
          </div>
        </Card>
        <Card className="flex navbar-gap">
          <img
            src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"
            alt="bitcoin"
          />
          <p>
            {Math.abs(data ? data.market_cap_percentage.btc : 0).toFixed(2)}%
          </p>
          <div className="firstProgressBar">
            {" "}
            <ProgressCustom
              number={
                data?.total_volume?.btc && data?.total_market_cap?.btc
                  ? Math.min(
                      100,
                      Math.max(
                        0,
                        (data.total_volume.btc / data.total_market_cap.btc) *
                          100
                      )
                    )
                  : 0
              }
            />{" "}
          </div>
        </Card>
        <Card className="flex navbar-gap">
          <img
            src="https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880"
            alt="ethereum"
          />
          <p>
            {Math.abs(data ? data.market_cap_percentage.eth : 0).toFixed(2)}%
          </p>
          <div className="firstProgressBar">
            <ProgressCustom
              number={
                data?.total_volume?.usd && data?.total_market_cap?.usd
                  ? Math.min(
                      100,
                      Math.max(
                        0,
                        (data.total_volume.eth / data.total_market_cap.eth) *
                          100
                      )
                    )
                  : 0
              }
            />
          </div>
        </Card>
      </Card>
    </Card>
  );
}

export default List;
