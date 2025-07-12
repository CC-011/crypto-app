import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { setOrder } from "../tablechart-query/tablechart-order";
import {
  ShowCoinPricesInUsDollars,
  ShowMarketNumbersInCompactForm,
} from "../Utils/formatNumbers";
import { fetchTableChart } from "../tableChart/table";
import { Line } from "react-chartjs-2";
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
  Filler
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
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
export default function TableChart() {
  const boolean = useSelector((state: RootState) => state.boolean);
  const defaultMarket = useSelector((state: RootState) => state.order);
  const rows = 50;
  const chartCurrencyEPage = "usd";
  const { data } = useQuery({
    queryKey: ["tableData", defaultMarket, chartCurrencyEPage, rows],
    queryFn: () => fetchTableChart({ defaultMarket, chartCurrencyEPage, rows }),
  });
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

    return <Line data={chartData} options={options} />;
  };

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
      <div
        className="w-full h-2 rounded overflow-hidden"
        style={{ background }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    );
  }

  const isMobile = useMediaQuery("(max-width: 600px)");

  const TableChart = React.memo(() => {
    return (
      <Card className="table-padding padding-top-table table-wrapper">
        {boolean && isMobile ? (
          <></>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => setOrder("id_asc")}
                    className="bold flexAlStart"
                  >
                    Name
                  </TableHead>
                  <TableHead
                    onClick={() => setOrder("market_cap_asc")}
                    className="bold"
                  >
                    Price
                  </TableHead>
                  <TableHead
                    onClick={() => setOrder("1h")}
                    className="percentage-title-padding"
                  >
                    1h%
                  </TableHead>
                  <TableHead
                    onClick={() => setOrder("24h")}
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
                {data?.map((data) => (
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
    );
  });

  TableChart.displayName = "TableChart";

  return <TableChart />;
}
