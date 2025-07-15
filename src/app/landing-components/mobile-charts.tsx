import React, { useState } from "react";
import { ShowMarketNumbersInCompactForm } from "../Utils/formatNumbers";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "../landingPageChart/landingPageChart";
import { fetchSecondCoinData } from "../landingPageChart/secondLandingPageChart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  registerables,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ...registerables
);
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  ChartConfig,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent,
  ChartContainer,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, Bar, BarChart, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function MobileChart() {
  const [interval, setInterval] = useState(0);
  const boolean = useSelector((state: RootState) => state.boolean);
  const compareWithSecondChart = useSelector(
    (state: RootState) => state.secondChart
  );
  const coinNameChart = useSelector((state: RootState) => state.coinNameChart);
  const coinNameSymbol = useSelector(
    (state: RootState) => state.coinSymbolChart
  );
  const chartCurrencyEPage = "usd";
  const chartNameEPage = coinNameChart.toLocaleLowerCase();
  const secondChartName = useSelector((state: RootState) => state.secondCoin);
  const { data: firstChart } = useQuery({
    queryKey: ["chartData", chartNameEPage, chartCurrencyEPage, interval],
    queryFn: () =>
      fetchChartData({ chartNameEPage, chartCurrencyEPage, interval }),
    enabled: boolean,
  });

  const { data: secondChart } = useQuery({
    queryKey: [
      "secondChartData",
      secondChartName,
      chartCurrencyEPage,
      interval,
    ],
    queryFn: () =>
      fetchSecondCoinData({ secondChartName, chartCurrencyEPage, interval }),
    enabled: !boolean,
  });

  let totalDesktop = 0;

  (firstChart?.total_volumes ?? []).forEach((data) => {
    totalDesktop += data[0] ?? 0;
  });

  let marketCapTotal = 0;

  (firstChart?.market_caps ?? []).forEach((data) => {
    marketCapTotal += data[1] ?? 0;
  });

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  function getDateRange(startDate: string, endDate: string) {
    const dates = [];
    const current = new Date(startDate);
    const last = new Date(endDate);

    for (let d = new Date(current); d <= last; d.setDate(d.getDate() + 1)) {
      dates.push(formatDate(d.getTime()));
    }

    return dates;
  }

  function buildDateMap(dataArray: [number, number][]) {
    const map = new Map<string, number>();
    dataArray.forEach(([timestamp, value]) => {
      const dateStr = formatDate(timestamp);
      if (!map.has(dateStr)) {
        map.set(dateStr, value);
      }
    });
    return map;
  }

  const prices1 = (firstChart?.prices ?? []) as [number, number][];
  const prices2 = (secondChart?.prices ?? []) as [number, number][];
  const volumes1 = (firstChart?.total_volumes ?? []) as [number, number][];
  const volumes2 = (secondChart?.total_volumes ?? []) as [number, number][];

  const allDates = [
    ...prices1.map(([t]) => formatDate(t)),
    ...prices2.map(([t]) => formatDate(t)),
    ...volumes1.map(([t]) => formatDate(t)),
    ...volumes2.map(([t]) => formatDate(t)),
  ];

  const sortedDates = Array.from(new Set(allDates)).sort();
  const minDate = sortedDates[0];
  const maxDate = sortedDates[sortedDates.length - 1];

  const fullDateRange = getDateRange(minDate, maxDate);

  const priceMap1 = buildDateMap(prices1);
  const priceMap2 = buildDateMap(prices2);
  const volumeMap1 = buildDateMap(volumes1);
  const volumeMap2 = buildDateMap(volumes2);

  const seenDays = new Set<string>();
  const chartDataRecharts = [];
  const barChartData = [];

  for (const dateStr of fullDateRange) {
    const day = dateStr.split("-")[2];
    if (!seenDays.has(day)) {
      seenDays.add(day);

      chartDataRecharts.push({
        month: day,
        mobile: priceMap1.get(dateStr) ?? 0,
        desktop: priceMap2.get(dateStr) ?? null,
      });

      barChartData.push({
        month: day,
        mobile: volumeMap1.get(dateStr) ?? 0,
        desktop: volumeMap2.get(dateStr) ?? null,
      });
    }
  }

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    desktop: {
      label: `${secondChartName}`,
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: `${chartNameEPage}`,
      color: "#7474F2",
    },
  } satisfies ChartConfig;

  const barChartConfig = {
    desktop: {
      label: ` ${chartNameEPage}`,
      color: "rgba(157, 98, 217, 1)",
    },
    mobile: {
      label: `${secondChartName}`,
      color: "rgba(157, 98, 217, 1)",
    },
  };

  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const pretty = date.toLocaleDateString("en-US", options);

  return (
    <div className="hide-input-field-mobile chart-mobile-margin">
      {boolean ? (
        <></>
      ) : (
        <>
          {firstChart?.prices.length ? (
            <>
              <Carousel className="flex center carousel-chart-size">
                <CarouselContent>
                  <>
                    <CarouselItem className="min-w-full">
                      <Card className="bg-leftChart">
                        <CardHeader>
                          <div className="chart-header">
                            <p className="coin-title text-coinTitleColor">
                              {coinNameChart}({coinNameSymbol})
                            </p>
                            <div>
                              <CardTitle>
                                <ShowMarketNumbersInCompactForm
                                  marketNumbers={marketCapTotal}
                                />
                              </CardTitle>
                              <p className="text-coinTitleColor">{pretty}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer
                            className="chart-padding-bottom"
                            config={chartConfig}
                          >
                            <AreaChart
                              width={600}
                              height={300}
                              className="g2"
                              accessibilityLayer
                              data={chartDataRecharts}
                            >
                              <XAxis
                                className="g4"
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                              />
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                              />
                              <defs>
                                <linearGradient
                                  id="fillDesktop"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                  />
                                </linearGradient>
                                <linearGradient
                                  id="fillMobile"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                  />
                                </linearGradient>
                              </defs>
                              <YAxis
                                yAxisId="bitcoin"
                                orientation="left"
                                hide={true}
                              />
                              <YAxis
                                yAxisId="ethereum"
                                orientation="left"
                                hide={true}
                              />
                              <Area
                                dataKey="mobile"
                                type="monotone"
                                fill="url(#fillMobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                yAxisId="bitcoin"
                              />
                              <Area
                                dataKey="desktop"
                                type="monotone"
                                fill="url(#fillDesktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                yAxisId="ethereum"
                              />
                              <ChartLegend
                                content={
                                  compareWithSecondChart ? (
                                    <ChartLegendContent />
                                  ) : (
                                    <ChartLegendContent className="hidden" />
                                  )
                                }
                              />
                            </AreaChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  </>
                  <>
                    <CarouselItem className="min-w-full">
                      <Card className="bg-barchart">
                        <CardHeader>
                          <div className="chart-header">
                            <p className="coin-title text-coinTitleColor">
                              Volume 24h
                            </p>
                            <div>
                              <CardTitle>
                                <ShowMarketNumbersInCompactForm
                                  marketNumbers={totalDesktop}
                                />
                              </CardTitle>
                              <p className="text-coinTitleColor">{pretty}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer
                            className="padding-bottom"
                            config={barChartConfig}
                          >
                            <BarChart
                              width={600}
                              height={300}
                              accessibilityLayer
                              data={barChartData}
                            >
                              <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                              />
                              <ChartTooltip
                                cursor={false}
                                content={
                                  <ChartTooltipContent indicator="dashed" />
                                }
                              />
                              <Bar
                                dataKey="desktop"
                                fill="var(--color-desktop)"
                                radius={4}
                              />
                              <Bar
                                dataKey="mobile"
                                fill="var(--color-mobile)"
                                radius={4}
                              />
                              <ChartLegend
                                content={
                                  compareWithSecondChart ? (
                                    <ChartLegendContent />
                                  ) : (
                                    <ChartLegendContent className="hidden" />
                                  )
                                }
                              />
                            </BarChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  </>
                </CarouselContent>
                <div className="carousel-button-container">
                  <div className="carousel-prev-button-container">
                    <CarouselPrevious />
                  </div>
                  <div className="carousel-next-button-container">
                    <CarouselNext />
                  </div>
                </div>
              </Carousel>
            </>
          ) : (
            <>
              <div className="bg-carouselBackground rounded-xl h-[400px] w-[100%]">
                <Skeleton className="h-[100%] w-[100%] bg-skeleton animate-pulse rounded-xl" />
              </div>
            </>
          )}
        </>
      )}
      {firstChart?.prices.length ? (
        <>
          {" "}
          <Card className="pt-[30px] pb-[50px] w-[300px]">
            <>
              <div className="bg-intervalContainer ml-10 rounded-[6px]">
                <Button
                  className={`text-white ${
                    interval === 1
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(1),
                      fetchChartData({
                        chartNameEPage,
                        chartCurrencyEPage,
                        interval,
                      });
                  }}
                >
                  1D
                </Button>
                <Button
                  className={`text-white ${
                    interval === 7
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(7),
                      fetchChartData({
                        chartNameEPage,
                        chartCurrencyEPage,
                        interval,
                      });
                  }}
                >
                  7D
                </Button>
                <Button
                  className={`text-white ${
                    interval === 14
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(14),
                      fetchChartData({
                        chartNameEPage,
                        chartCurrencyEPage,
                        interval,
                      });
                  }}
                >
                  14D
                </Button>
                <Button
                  className={`text-white ${
                    interval === 30
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(30),
                      fetchChartData({
                        chartNameEPage,
                        chartCurrencyEPage,
                        interval,
                      });
                  }}
                >
                  1M
                </Button>
                <Button
                  className={`text-white ${
                    interval === 365
                      ? "bg-intervalButton"
                      : "bg-intervalContainer"
                  }`}
                  onClick={() => {
                    setInterval(365),
                      fetchChartData({
                        chartNameEPage,
                        chartCurrencyEPage,
                        interval,
                      });
                  }}
                >
                  1Y
                </Button>
              </div>
            </>
          </Card>{" "}
        </>
      ) : (
        <>
          <div className="rounded-xl pt-4 h-[40px] w-[100%]">
            <Skeleton className="h-[100%] w-[300px] bg-skeleton animate-pulse rounded-xl" />
          </div>
        </>
      )}
    </div>
  );
}
