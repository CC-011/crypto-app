"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "./lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";
import Link from "next/link";
import { fetchChartData } from "./landingPageChart/landingPageChart";
import { fetchSecondCoinData } from "./landingPageChart/secondLandingPageChart";
import { fetchTableChart } from "./tableChart/table";
import { setState } from "./landingPageChart/secondLandingPageChart";
import { useState } from "react";
import { Area, AreaChart, XAxis, Bar, BarChart, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Chart } from "react-chartjs-2";
import {
  ShowMarketNumbersInCompactForm,
  ShowCoinPricesInUsDollars,
} from "./Utils/formatNumbers";
import Image from "next/image";
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
  ChartOptions,
  ChartData,
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
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

function List() {
  const dispatch = useAppDispatch();
  const { chartData } = useSelector((state: RootState) => state.chart);
  const { chartDataSecondCoin } = useSelector(
    (state: RootState) => state.secondCoin
  );
  const { tableChart } = useSelector((state: RootState) => state.table);
  const boolean = useSelector((state: RootState) => state.boolean);
  const [chartNameEPage, setCharNameEPage] = useState("bitcoin");
  const [secondChartName, setSecondChartName] = useState("");
  const [compareCoinMode, setCompareCoinMode] = useState(false);
  const chartCurrencyEPage = "usd";

  function useMediaQuery(query: string) {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const mediaQueryList = window.matchMedia(query);
      setMatches(mediaQueryList.matches);
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      mediaQueryList.addEventListener("change", listener);
      return () => mediaQueryList.removeEventListener("change", listener);
    }, [query]);

    return matches;
  }

  useEffect(() => {
    if (compareCoinMode === false) {
      dispatch(fetchChartData({ chartNameEPage, chartCurrencyEPage }));
    }
  });

  useEffect(() => {
    if (compareCoinMode === true) {
      dispatch(fetchSecondCoinData({ secondChartName, chartCurrencyEPage }));
    }
  });
  useEffect(() => {
    if (compareCoinMode === false && chartDataSecondCoin !== null) {
      dispatch(setState(null));
    }
  });

  interface barPercentage {
    number: number;
    color: string;
    background: string;
  }

  function ProgressCustom({ number, color, background }: barPercentage) {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(number), 500);
      return () => clearTimeout(timer);
    }, [number]);

    return (
      <div>
        <Progress
          background={background}
          color={color}
          value={progress}
          className="w-[100%]"
        />
      </div>
    );
  }

  let totalDesktop = 0;

  (chartData?.total_volumes ?? []).forEach((data) => {
    totalDesktop += data[0] ?? 0;
  });

  let marketCapTotal = 0;

  (chartData?.market_caps ?? []).forEach((data) => {
    marketCapTotal += data[1] ?? 0;
  });

  interface TablePropsData {
    dataProp?: number[];
    data1h?: number;
    data24h?: number;
    data7d: number;
  }

  const TableChartForCoins = ({
    dataProp = [],
    data1h = 0,
    data24h = 0,
    data7d = 0,
  }: TablePropsData) => {
    if (!dataProp.length) {
      return <p>No chart data available</p>;
    }
    const labels = dataProp.map((el, index) => index);
    const chartData: ChartData<"line"> = {
      labels,
      datasets: [
        {
          data: dataProp,
          fill: true,
          label: "Price",
          backgroundColor:
            data1h >= 0 && data24h >= 0 && data7d >= 0
              ? "rgba(0, 177, 167, 0.1)"
              : "rgba(254, 34, 100, 0.1)",

          borderColor:
            data1h >= 0 && data24h >= 0 && data7d >= 0 ? "#00B1A7" : "#FE2264",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: (context) => `$${(context.raw as number).toFixed(4)}`,
          },
        },
      },
      scales: {
        x: {
          display: false,
          ticks: {
            maxTicksLimit: 10,
            autoSkip: true,
          },
        },
        y: {
          display: false,
          beginAtZero: false,
          grace: "5%",
        },
      },
    };

    return <Chart type="line" data={chartData} options={options} />;
  };

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

  const prices1 = (chartData?.prices ?? []) as [number, number][];
  const prices2 = (chartDataSecondCoin?.prices ?? []) as [number, number][];
  const volumes1 = (chartData?.total_volumes ?? []) as [number, number][];
  const volumes2 = (chartDataSecondCoin?.total_volumes ?? []) as [
    number,
    number,
  ][];

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

  const [defaultMarket, setDefaultMarket] = useState("market_cap_desc");
  const [ChartNameBasedOnInput, setChartNameBasedOnInput] = useState("Bitcoin");
  const [SymbolName, setSymbolName] = useState("BTC");

  useEffect(() => {
    dispatch(fetchTableChart({ defaultMarket, chartCurrencyEPage }));
  }, [dispatch, defaultMarket, chartCurrencyEPage]);

  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const pretty = date.toLocaleDateString("en-US", options);
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <div className="coinLandingPageContainer overflow-hidden">
      <div className="mainChartsAndCarousel">
        <Carousel className="carousel">
          <div className="space-between compare-button-container gap">
            <p className="text-coinTitleColor select-currency-padding">
              Select the currency to view statics
            </p>
            <button onClick={() => setCompareCoinMode(!compareCoinMode)}>
              <div
                className={`flex compare-button bg-compareMode pointer ${compareCoinMode ? "exit-compare" : ""}`}
              >
                <div>
                  {compareCoinMode ? (
                    <svg
                      className="home-portfolio-icon"
                      fill="hsl(var(--homeIcon))"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  ) : (
                    <svg
                      className="home-portfolio-icon"
                      fill="hsl(var(--homeIcon))"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M320 488c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1s14.2 12.4 14.2 21.9l0 40 16 0c35.3 0 64-28.7 64-64l0-166.7C371.7 141 352 112.8 352 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3L464 320c0 70.7-57.3 128-128 128l-16 0 0 40zM456 80a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM192 24c0-9.5 5.6-18.1 14.2-21.9s18.8-2.3 25.8 4.1l80 72c5.1 4.6 7.9 11 7.9 17.8s-2.9 13.3-7.9 17.8l-80 72c-7 6.3-17.2 7.9-25.8 4.1s-14.2-12.4-14.2-21.9l0-40-16 0c-35.3 0-64 28.7-64 64l0 166.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3L48 192c0-70.7 57.3-128 128-128l16 0 0-40zM56 432a24 24 0 1 0 48 0 24 24 0 1 0 -48 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <div>{compareCoinMode ? "Exit comparison" : "Compare"}</div>
                </div>
              </div>
            </button>
          </div>
          <CarouselContent>
            {tableChart?.map((data) => (
              <CarouselItem key={data.id}>
                <div className="bg-carouselBackground carousel-item mobile-width-height">
                  <Card className="flex">
                    <div className="carousel-image">
                      <img
                        width={35}
                        height={35}
                        src={data.image}
                        alt="coin image"
                      />
                    </div>
                    <div className="carousel-title-container">
                      <div className="carousel-title-coin">
                        <span
                          className="hide"
                          onClick={(e) => {
                            if (compareCoinMode === false) {
                              setSecondChartName(" "),
                                setCharNameEPage(
                                  e.currentTarget.innerText.toLocaleLowerCase()
                                ),
                                setChartNameBasedOnInput(
                                  e.currentTarget.innerText
                                ),
                                setSymbolName(data.symbol);
                            } else if (compareCoinMode === true) {
                              setSecondChartName(
                                e.currentTarget.innerText.toLocaleLowerCase()
                              );
                            }
                          }}
                        >
                          {data.name}
                        </span>
                        <span className="hide">
                          ({data.symbol.toLocaleUpperCase()})
                        </span>
                        <span
                          onClick={(e) => {
                            if (compareCoinMode === false) {
                              setSecondChartName(" "),
                                setCharNameEPage(
                                  e.currentTarget.innerText.toLocaleLowerCase()
                                ),
                                setChartNameBasedOnInput(
                                  e.currentTarget.innerText
                                ),
                                setSymbolName(data.symbol);
                            } else if (compareCoinMode === true) {
                              setSecondChartName(
                                e.currentTarget.innerText.toLocaleLowerCase()
                              );
                            }
                          }}
                          className="hide-input-field-mobile pointer"
                        >
                          {data.symbol.toLocaleUpperCase()}
                        </span>
                      </div>
                      <span className="carousel-price-color flex hide">
                        <ShowCoinPricesInUsDollars
                          cryptoPricesInUsDollars={data?.current_price}
                        />
                        <div
                          className="coin-1h-percentage-container carousel-text hide"
                          style={{
                            color:
                              data.price_change_percentage_1h_in_currency >= 0
                                ? "#01F1E3"
                                : "#FE1040",
                          }}
                        >
                          {data.price_change_percentage_1h_in_currency >= 0 ? (
                            <svg
                              width={5}
                              height={5}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#01F1E3"
                              viewBox="0 0 24 24"
                              strokeWidth={0}
                              stroke="currentColor"
                              className="size-6 carousel-svg"
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
                              width={5}
                              height={5}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#FE1040"
                              viewBox="0 0 24 24"
                              strokeWidth={0}
                              stroke="currentColor"
                              className="size-6 carousel-svg"
                            >
                              {" "}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />{" "}
                            </svg>
                          )}
                          {Math.abs(
                            data.price_change_percentage_1h_in_currency
                          ).toFixed(2)}
                          %
                        </div>
                      </span>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Card className="chart-container hide">
        <Card className="bg-leftChart chart-size">
          <CardHeader>
            <div className="chart-header">
              <p className="coin-title text-coinTitleColor">
                {ChartNameBasedOnInput}({SymbolName.toLocaleUpperCase()})
              </p>
              <div>
                <CardTitle className="coin-price">
                  <ShowMarketNumbersInCompactForm
                    marketNumbers={marketCapTotal}
                  />
                </CardTitle>
                <p className="text-coinTitleColor">{pretty}</p>
              </div>
            </div>
          </CardHeader>
          <div className="inner-chart-padding">
            <ChartContainer config={chartConfig}>
              <AreaChart
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
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
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
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
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
                <YAxis yAxisId="bitcoin" orientation="left" hide={true} />
                <YAxis yAxisId="ethereum" orientation="left" hide={true} />
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
                    compareCoinMode ? (
                      <ChartLegendContent />
                    ) : (
                      <ChartLegendContent className="hidden" />
                    )
                  }
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </Card>
        <Card className="bg-barchart chart-size">
          <CardHeader>
            <div className="chart-header">
              <p className="coin-title text-coinTitleColor">Volume 24h</p>
              <div>
                <CardTitle className="coin-price">
                  <ShowMarketNumbersInCompactForm
                    marketNumbers={totalDesktop}
                  />
                </CardTitle>
                <p className="text-coinTitleColor">{pretty}</p>
              </div>
            </div>
          </CardHeader>
          <div className="inner-chart-padding">
            <ChartContainer config={barChartConfig}>
              <BarChart accessibilityLayer data={barChartData}>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                <ChartLegend
                  content={
                    compareCoinMode ? (
                      <ChartLegendContent />
                    ) : (
                      <ChartLegendContent className="hidden" />
                    )
                  }
                />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      </Card>
      <div className="hide-input-field-mobile chart-mobile-margin">
        {boolean ? (
          <></>
        ) : (
          <>
            <Carousel className="flex center carousel-chart-size">
              <CarouselContent>
                <CarouselItem className="min-w-full">
                  <Card className="bg-leftChart">
                    <CardHeader>
                      <div className="chart-header">
                        <p className="coin-title text-coinTitleColor">
                          {ChartNameBasedOnInput}(
                          {SymbolName.toLocaleUpperCase()})
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
                              compareCoinMode ? (
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
                            content={<ChartTooltipContent indicator="dashed" />}
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
                              compareCoinMode ? (
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
        )}
      </div>
      <Card className="table-padding padding-top-table table-wrapper">
        {boolean && isMobile ? (
          <></>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => setDefaultMarket("id_asc")}
                    className="bold flexAlStart"
                  >
                    Name
                  </TableHead>
                  <TableHead
                    onClick={() => setDefaultMarket("market_cap_asc")}
                    className="bold"
                  >
                    Price
                  </TableHead>
                  <TableHead
                    onClick={() => setDefaultMarket("1h")}
                    className="percentage-title-padding"
                  >
                    1h%
                  </TableHead>
                  <TableHead
                    onClick={() => setDefaultMarket("24h")}
                    className="percentage-title-padding"
                  >
                    24h%
                  </TableHead>
                  <TableHead className="percentage-title-padding hide">
                    7d%
                  </TableHead>
                  <TableHead className="bold hide">
                    24h Vol / Market Cap
                  </TableHead>
                  <TableHead className="bold hide">
                    Circulating / Total Sup
                  </TableHead>
                  <TableHead className="bold hide">Last 7d</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableChart?.map((data) => (
                  <TableRow
                    className="bg-carouselBackground table-row"
                    key={data.id}
                  >
                    <TableCell className="font-medium table-image-container">
                      <Image
                        src={data.image}
                        alt="Image not found"
                        height={20}
                        width={20}
                      />
                      <Link
                        className="coin-link z-index"
                        href={`/coin/${data.name.toLocaleLowerCase()}`}
                      >
                        <div className="flex flex-column">
                          <div>{data.name}</div>
                          <div>({data.symbol.toLocaleUpperCase()})</div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ShowCoinPricesInUsDollars
                        cryptoPricesInUsDollars={data?.current_price}
                      />
                    </TableCell>
                    <TableCell className="percentages-padding">
                      <div
                        className="flex align-center"
                        style={{
                          color:
                            data.price_change_percentage_1h_in_currency >= 0
                              ? "#01F1E3"
                              : "#FE1040",
                        }}
                      >
                        {data.price_change_percentage_1h_in_currency >= 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#01F1E3"
                            viewBox="0 0 24 24"
                            strokeWidth={0}
                            stroke="currentColor"
                            className="size-6 carousel-svg"
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
                            className="size-6 carousel-svg"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />{" "}
                          </svg>
                        )}
                        {Math.abs(
                          data.price_change_percentage_1h_in_currency
                        ).toFixed(2)}
                        %
                      </div>
                    </TableCell>
                    <TableCell className="percentages-padding">
                      <div
                        className="flex align-center"
                        style={{
                          color:
                            data.price_change_percentage_24h >= 0
                              ? "#01F1E3"
                              : "#FE1040",
                        }}
                      >
                        {data.price_change_percentage_24h >= 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#01F1E3"
                            viewBox="0 0 24 24"
                            strokeWidth={0}
                            stroke="currentColor"
                            className="size-6 carousel-svg"
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
                            className="size-6 carousel-svg"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />{" "}
                          </svg>
                        )}
                        {Math.abs(data.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </TableCell>

                    <TableCell className="percentages-padding hide">
                      <div
                        className="flex align-center"
                        style={{
                          color:
                            data.price_change_percentage_7d_in_currency >= 0
                              ? "#01F1E3"
                              : "#FE1040",
                        }}
                      >
                        {data.price_change_percentage_7d_in_currency >= 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#01F1E3"
                            viewBox="0 0 24 24"
                            strokeWidth={0}
                            stroke="currentColor"
                            className="size-6 carousel-svg"
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
                            className="size-6 carousel-svg"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />{" "}
                          </svg>
                        )}
                        {Math.abs(
                          data.price_change_percentage_7d_in_currency
                        ).toFixed(2)}
                        %
                      </div>
                    </TableCell>
                    <TableCell className="hide">
                      <div className="space-marketCap">
                        <div
                          style={{
                            color:
                              data.price_change_percentage_1h_in_currency >=
                                0 &&
                              data.price_change_percentage_24h >= 0 &&
                              data.price_change_percentage_7d_in_currency >= 0
                                ? "#01F1E3"
                                : "#FE1040",
                          }}
                        >
                          <ShowMarketNumbersInCompactForm
                            marketNumbers={data?.total_volume}
                          />
                        </div>
                        <div
                          style={{
                            color:
                              data.price_change_percentage_1h_in_currency >=
                                0 &&
                              data.price_change_percentage_24h >= 0 &&
                              data.price_change_percentage_7d_in_currency >= 0
                                ? "#01F1E3"
                                : "#FE1040",
                          }}
                        >
                          <ShowMarketNumbersInCompactForm
                            marketNumbers={data?.market_cap}
                          />
                        </div>
                      </div>
                      <Card className="progressbar-table hide">
                        <ProgressCustom
                          number={(data.total_volume / data.market_cap) * 100}
                          color={
                            data.price_change_percentage_1h_in_currency >= 0 &&
                            data.price_change_percentage_24h >= 0 &&
                            data.price_change_percentage_7d_in_currency >= 0
                              ? "#00B1A7"
                              : "#FE2264"
                          }
                          background={
                            data.price_change_percentage_1h_in_currency >= 0 &&
                            data.price_change_percentage_24h >= 0 &&
                            data.price_change_percentage_7d_in_currency >= 0
                              ? "rgba(0, 177, 167, 0.1)"
                              : "rgba(254, 34, 100, 0.1)"
                          }
                        />
                      </Card>
                    </TableCell>
                    <TableCell className="hide">
                      <div className="space-marketCap">
                        <div
                          style={{
                            color:
                              data.price_change_percentage_1h_in_currency >=
                                0 &&
                              data.price_change_percentage_24h >= 0 &&
                              data.price_change_percentage_7d_in_currency >= 0
                                ? "#01F1E3"
                                : "#FE1040",
                          }}
                        >
                          <ShowMarketNumbersInCompactForm
                            marketNumbers={data?.circulating_supply}
                          />
                        </div>
                        <div
                          style={{
                            color:
                              data.price_change_percentage_1h_in_currency >=
                                0 &&
                              data.price_change_percentage_24h >= 0 &&
                              data.price_change_percentage_7d_in_currency >= 0
                                ? "#01F1E3"
                                : "#FE1040",
                          }}
                        >
                          <ShowMarketNumbersInCompactForm
                            marketNumbers={data?.total_supply}
                          />
                        </div>
                      </div>
                      <Card className="progressbar-table hide">
                        <ProgressCustom
                          number={
                            (data.circulating_supply / data.total_volume) * 100
                          }
                          color={
                            data.price_change_percentage_1h_in_currency >= 0 &&
                            data.price_change_percentage_24h >= 0 &&
                            data.price_change_percentage_7d_in_currency >= 0
                              ? "#00B1A7"
                              : "#FE2264"
                          }
                          background={
                            data.price_change_percentage_1h_in_currency >= 0 &&
                            data.price_change_percentage_24h >= 0 &&
                            data.price_change_percentage_7d_in_currency >= 0
                              ? "rgba(0, 177, 167, 0.1)"
                              : "rgba(254, 34, 100, 0.1)"
                          }
                        />
                      </Card>
                    </TableCell>
                    <TableCell className="hide">
                      <div className="sparkLine-chart sparkline-padding">
                        <TableChartForCoins
                          dataProp={data?.sparkline_in_7d?.price}
                          data1h={data.price_change_percentage_1h_in_currency}
                          data24h={data.price_change_percentage_24h}
                          data7d={data.price_change_percentage_7d_in_currency}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </>
        )}
      </Card>
    </div>
  );
}

export default List;
