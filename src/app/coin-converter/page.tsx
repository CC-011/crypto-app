"use client";
import React from "react";
import { useAppDispatch } from "../lib/hooks";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { useState, useEffect } from "react";
import { fetchConverterData } from "./fetchCoinPrice";
import Buttons from "../navbarComponent/navigation-buttons";
import { ShowCoinPricesInBTC } from "../Utils/formatNumbers";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export default function Converter() {
  const [interVal, setInterval] = useState(1);
  const [total, setTotal] = useState(0);
  const currency = useSelector((state: RootState) => state.converterCurrency);
  const { tableChart } = useSelector((state: RootState) => state.table);
  const filtered = tableChart?.filter((data) => data.name);
  const date = new Date();
  const { chartData } = useSelector((state: RootState) => state.converter);
  const dispatch = useAppDispatch();
  const formatted = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  type TableChartData = {
    id: number;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    sparkline_in_7d: {
      price: number[];
    };
  };

  const [coinNameOne, setCoinNameOne] = useState<TableChartData | null>(null);
  const [coinNameTwo, setCoinNameTwo] = useState<TableChartData | null>(null);
  const handleSelect = (coinName: string, isBuy: boolean) => {
    const selected = filtered?.find((coin) => coin.name === coinName);
    if (!selected) return;
    if (isBuy) {
      setCoinNameTwo(selected);
    } else {
      setCoinNameOne(selected);
    }
  };

  useEffect(() => {
    fetchConverterData({
      coinNameOne: coinNameOne?.name.toLocaleLowerCase() ?? "",
      coinInterval: interVal,
    });
  }, [coinNameOne, interVal]);

  const handleReverse = () => {
    setCoinNameOne(coinNameTwo);
    setCoinNameTwo(coinNameOne);
  };

  const formatChartData = (
    data: [number, number][] | null,
    interVal: number
  ): { time: string; value: number }[] => {
    if (!data) return [];
    return data.map(([timestamp, value]) => {
      const fixedTimestamp = timestamp < 1e12 ? timestamp * 1000 : timestamp;
      const date = new Date(fixedTimestamp);
      let time = "";
      if (interVal === 1) {
        time = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      } else if (interVal <= 30) {
        time = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      } else {
        time = date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }
      return {
        time,
        value,
      };
    });
  };

  type BitcoinData = {
    prices: [number, number][];
  };

  const CoinChart = (coin: BitcoinData) => {
    if (!coin) return null;
    const data = formatChartData(coin?.prices, interVal);

    return (
      <div className="w-full h-64">
        <h3 className="chart-title text-lg font-medium mb-2 pt-6 text-converterTitle">
          {coinNameOne?.name} ({coinNameOne?.symbol.toUpperCase()}) to{" "}
          {coinNameTwo?.name} ({coinNameTwo?.symbol.toUpperCase()})
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(91, 46, 255, 0.6)" />
                <stop offset="75%" stopColor="rgba(91, 46, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(91, 46, 255, 0)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "hsl(var(--converter-title))" }}
              tickMargin={10}
              angle={0}
              textAnchor={interVal === 1 ? "middle" : "end"}
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={["auto", "auto"]} hide />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "none" }}
              itemStyle={{ borderRadius: "8px" }}
            />
            <Area
              type="basis"
              dataKey="value"
              stroke="#5B2EFF"
              fill="url(#customGradient)"
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 4, strokeWidth: 0, fill: "#5B2EFF" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card className="flex column">
      <div className="hide button-link-container">
        <Buttons />{" "}
      </div>
      <div className="padding-left-title title-size">
        <h1 className="text-converterTitle">Online currency converter</h1>
        <p className="text-converterTime">{formatted}</p>
      </div>
      <Card className="first-input-container">
        <Card className="converterDisplay">
          <div className="flex bg-navbar"></div>
          <>
            <div className="bg-converterInput first-coin-convertor">
              <div className="text-coinTitleColor">You sell</div>
              <div className="flex align first-input-items">
                <div>
                  <Select
                    value={coinNameOne?.name || undefined}
                    onValueChange={(val) => {
                      handleSelect(val, false);
                    }}
                  >
                    <SelectTrigger className="first-dropdown-width border-0 focus:outline-none focus:ring-0 focus:border-0 shadow-none">
                      <SelectValue
                        className="text-white/40"
                        placeholder="Please select a coin"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {filtered?.map((coin) => (
                        <SelectItem key={coin.id} value={coin.name}>
                          <div className="flex items-center gap-2 text-converterTitle">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-10 h-10"
                            />
                            <p className="text-[20px]">
                              {coin.name} ({coin.symbol.toUpperCase()})
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    min={1}
                    type="number"
                    onChange={(e) => setTotal(parseInt(e.target.value))}
                    className="h-12 border-none focus-visible:outline-none focus-visible:ring-0 width-input shadow-none"
                  />
                </div>
              </div>
              <div className="borderLine white-line-first-box"></div>
              {coinNameOne ? (
                <>
                  {" "}
                  <div className="flex symbol-price-container text-converterTitle">
                    <div>
                      {total} {coinNameOne?.symbol.toLocaleUpperCase()}{" "}
                    </div>
                    =
                    <div>
                      <ShowCoinPricesInBTC
                        cryptoSymbol={currency}
                        cryptoPricesInUsBitcoin={
                          (coinNameOne?.current_price ?? 0) * total
                        }
                      />
                    </div>
                  </div>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="bg-converterInput converter-input">
              <div className="text-coinTitleColor">You buy</div>
              <div className="flex align space-between-inputs dropdown-menu-container">
                <div>
                  <Card className="filterList"></Card>
                  <Select
                    value={coinNameTwo?.name || undefined}
                    onValueChange={(val) => handleSelect(val, true)}
                  >
                    <SelectTrigger className="border-0 focus:outline-none focus:ring-0 focus:border-0 shadow-none">
                      <SelectValue
                        className="text-white/40"
                        placeholder="Please select a coin"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {filtered?.map((coin) => (
                        <SelectItem key={coin.id} value={coin.name}>
                          <div className="flex items-center gap-2 text-converterTitle">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-10 h-10"
                            />
                            <p className="text-[20px]">
                              {coin.name} ({coin.symbol.toUpperCase()})
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p>
                    {coinNameOne?.current_price &&
                    coinNameTwo?.current_price ? (
                      (
                        (total * coinNameOne.current_price) /
                        coinNameTwo.current_price
                      ).toFixed(2)
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
              <div className="borderLine white-line-2"></div>

              {coinNameTwo ? (
                <>
                  {" "}
                  <div className="flex price-and-symbol-container text-converterTitle">
                    <div>
                      {total} {coinNameTwo?.symbol.toLocaleUpperCase()}{" "}
                    </div>
                    =
                    <div>
                      <ShowCoinPricesInBTC
                        cryptoSymbol={currency}
                        cryptoPricesInUsBitcoin={
                          (coinNameOne?.current_price ?? 0) * total
                        }
                      />
                    </div>
                  </div>{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        </Card>
      </Card>
      <button className="reverse-button" onClick={handleReverse}>
        <img src="https://i.ibb.co/YF5ypkF7/Vertical-switch.png" />
      </button>
      <Card className="flex center align column chart-container">
        <Card className="bg-converterInput widthChart chart-size-styling">
          {coinNameOne && coinNameTwo ? (
            <>{chartData && <CoinChart prices={chartData.prices} />}</>
          ) : (
            <></>
          )}
        </Card>
      </Card>
      <div>
        <Card className="padding-left-interval-button">
          {coinNameOne?.name && coinNameTwo?.name ? (
            <>
              <div
                style={{
                  borderRadius: "6px",
                  width: "260px",
                }}
                className="bg-intervalContainer"
              >
                <Button
                  className={`text-white ${
                    interVal === 1
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(1),
                      dispatch(
                        fetchConverterData({
                          coinNameOne:
                            coinNameOne?.name.toLocaleLowerCase() ?? "",
                          coinInterval: 1,
                        })
                      );
                  }}
                >
                  1D
                </Button>
                <Button
                  className={`text-white ${
                    interVal === 7
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(7),
                      dispatch(
                        fetchConverterData({
                          coinNameOne:
                            coinNameOne?.name.toLocaleLowerCase() ?? "",
                          coinInterval: 7,
                        })
                      );
                  }}
                >
                  7D
                </Button>
                <Button
                  className={`text-white ${
                    interVal === 14
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(14),
                      dispatch(
                        fetchConverterData({
                          coinNameOne:
                            coinNameOne?.name.toLocaleLowerCase() ?? "",
                          coinInterval: 14,
                        })
                      );
                  }}
                >
                  14D
                </Button>
                <Button
                  className={`text-white ${
                    interVal === 30
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(30),
                      dispatch(
                        fetchConverterData({
                          coinNameOne:
                            coinNameOne?.name.toLocaleLowerCase() ?? "",
                          coinInterval: 30,
                        })
                      );
                  }}
                >
                  1M
                </Button>
                <Button
                  className={`text-white ${
                    interVal === 365
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(365),
                      dispatch(
                        fetchConverterData({
                          coinNameOne:
                            coinNameOne?.name.toLocaleLowerCase() ?? "",
                          coinInterval: 365,
                        })
                      );
                  }}
                >
                  1Y
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </Card>
      </div>
    </Card>
  );
}
