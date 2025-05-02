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
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Bar,
  BarChart,
  YAxis,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function List() {
  const dispatch = useAppDispatch();
  const { chartData } = useSelector((state: RootState) => state.chart);
  const { chartDataSecondCoin } = useSelector(
    (state: RootState) => state.secondCoin
  );
  const { tableChart } = useSelector((state: RootState) => state.table);
  const [chartNameEPage, setCharNameEPage] = useState("bitcoin");
  const [secondChartName, setSecondChartName] = useState("");
  const [compareCoinMode, setCompareCoinMode] = useState(false);
  const chartCurrencyEPage = "usd";
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
  }

  function ProgressCustom({ number }: barPercentage) {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(number), 500);
      return () => clearTimeout(timer);
    }, [number]);

    return <Progress value={progress} className="w-[100%]" />;
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
  }

  const TableChartForCoins = ({ dataProp = [] }: TablePropsData) => {
    const chartData: ChartData<"line"> = {
      labels: dataProp.map((data, _) => _),
      datasets: [
        {
          data: dataProp.map((data) => data),
          fill: false,
          label: "Dataset",
          backgroundColor: "#39FF14",
          borderWidth: 4,
          borderColor: "#39FF14",
          tension: 0.9,
          pointRadius: 0,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: { display: false },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    };

    return <Chart type="line" data={chartData} options={options} />;
  };

  const mappedTime = chartData?.prices
    ?.map((el) => new Date(el[0]).getHours())
    .map((_, index) => index + 1)
    .filter((el) => el < 12)
    .map((el) => el.toString()) ?? [""];
  const chartDataRecharts = mappedTime.map((month, index) => ({
    month,
    mobile: chartData?.prices?.[index]?.[1] ?? 0,
    desktop: chartDataSecondCoin?.prices?.[index]?.[1] ?? null,
  }));

  const barChartData = mappedTime.map((month, index) => ({
    month,
    mobile: chartData?.total_volumes?.[index]?.[1] ?? 0,
    desktop: chartDataSecondCoin?.total_volumes?.[index]?.[1] ?? null,
  }));

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

  return (
    <div className="coinLandingPageContainer">
      <div className="mainChartsAndCarousel">
        <Carousel className="carousel">
          <button
            onClick={() => setCompareCoinMode(!compareCoinMode)}
            className="compare-button"
          >
            Compare
          </button>
          <CarouselContent>
            {tableChart?.map((data) => (
              <CarouselItem key={data.id}>
                <div className="bg-carouselBackground carousel-item">
                  <Card className="flex">
                    <div className="carousel-image">
                      <img
                        width={35}
                        height={35}
                        src={data.image}
                        alt="coin image"
                      />
                    </div>
                    <div>
                      <div className="carousel-title-coin">
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
                        >
                          {data.name}
                        </span>
                        <span>({data.symbol.toLocaleUpperCase()})</span>
                      </div>
                      <span className="carousel-price-color flex">
                        <ShowCoinPricesInUsDollars
                          cryptoPricesInUsDollars={data?.current_price}
                        />
                        <div
                          className="coin-1h-percentage-container carousel-text"
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
          <CarouselPrevious className="carousel-button" />
          <CarouselNext className="carousel-button" />
        </Carousel>
      </div>
      <Card className="chart-container">
        <Card className="bg-leftChart chart-size">
          <CardHeader>
            <div className="chart-header">
              <p className="coin-title">
                {ChartNameBasedOnInput}({SymbolName.toLocaleUpperCase()})
              </p>
              <CardTitle className="coin-price">
                <ShowMarketNumbersInCompactForm
                  marketNumbers={marketCapTotal}
                />
              </CardTitle>
              <p>{pretty}</p>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart accessibilityLayer data={chartDataRecharts}>
                <CartesianGrid vertical={false} />
                <XAxis
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
                  content={compareCoinMode ? <ChartLegendContent /> : <></>}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="bg-barchart chart-size">
          <CardHeader>
            <div className="chart-header">
              <p className="coin-title">Volume 24h</p>
              <CardTitle className="coin-price">
                <ShowMarketNumbersInCompactForm marketNumbers={totalDesktop} />
              </CardTitle>
              <p>{pretty}</p>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig}>
              <BarChart accessibilityLayer data={barChartData}>
                <CartesianGrid vertical={false} />
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
                  content={compareCoinMode ? <ChartLegendContent /> : <></>}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Card>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => setDefaultMarket("id_asc")}>
                Name
              </TableHead>
              <TableHead onClick={() => setDefaultMarket("market_cap_asc")}>
                Price
              </TableHead>
              <TableHead onClick={() => setDefaultMarket("1h")}>1h</TableHead>
              <TableHead onClick={() => setDefaultMarket("24h")}>24h</TableHead>
              <TableHead>7d</TableHead>
              <TableHead>24h Vol / Market Cap</TableHead>
              <TableHead>Circulating / Total Sup</TableHead>
              <TableHead className="text-align">Last 7d</TableHead>
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
                    className="coin-link"
                    href={`/coin/${data.name.toLocaleLowerCase()}`}
                  >
                    {data.name}({data.symbol.toLocaleUpperCase()})
                  </Link>
                </TableCell>
                <TableCell>
                  <ShowCoinPricesInUsDollars
                    cryptoPricesInUsDollars={data?.current_price}
                  />
                </TableCell>
                <TableCell
                  className="carousel-text"
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
                </TableCell>
                <TableCell
                  className="carousel-text"
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
                </TableCell>
                <TableCell
                  className="carousel-text"
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
                </TableCell>
                <TableCell>
                  <ShowMarketNumbersInCompactForm
                    marketNumbers={data?.total_volume}
                  />
                  -
                  <ShowMarketNumbersInCompactForm
                    marketNumbers={data?.market_cap}
                  />
                  <Card className="progressbar-table">
                    <ProgressCustom
                      number={(data.total_volume / data.market_cap) * 100}
                    />
                  </Card>
                </TableCell>
                <TableCell>
                  <ShowMarketNumbersInCompactForm
                    marketNumbers={data?.circulating_supply}
                  />
                  -
                  <ShowMarketNumbersInCompactForm
                    marketNumbers={data?.total_supply}
                  />
                  <Card className="progressbar-table">
                    <ProgressCustom
                      number={
                        (data.circulating_supply / data.total_volume) * 100
                      }
                    />
                  </Card>
                </TableCell>
                <TableCell>
                  <div className="sparkLine-chart">
                    <TableChartForCoins
                      dataProp={data?.sparkline_in_7d.price}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </Card>
    </div>
  );
}

export default List;
