"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "./lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";
import Link from "next/link";
import { fetchChartData } from "./landingPageChart/landingPageChart";
import { fetchTableChart } from "./tableChart/table";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Bar, BarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Chart } from "react-chartjs-2";
import {
  ShowMarketNumbersInCompactForm,
  ShowCoinPricesInUsDollars,
} from "./Utils/formatNumbers";
import {
  Flex,
  ContainerForTableChart,
  Table,
  TableCaption,
  Progress,
  Container,
} from "./styledComponents/styles";
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
  const { tableChart } = useSelector((state: RootState) => state.table);
  const [chartNameEPage, setCharNameEPage] = useState("bitcoin");
  const chartCurrencyEPage = "usd";
  useEffect(() => {
    dispatch(fetchChartData({chartNameEPage, chartCurrencyEPage}));
  }, [dispatch, chartNameEPage, chartCurrencyEPage]);

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
          backgroundColor: "black",
          borderWidth: 4,
          borderColor: "red",
          tension: 0.5,
          pointStyle: false,
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

 const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chartDataRecharts = months.map((month, index) => ({
    month,
    mobile:  chartData?.prices[index]?.[1] ?? 0, // Ensure safe access
    //desktop: chartData?.prices[index]?.[0] ?? 0,  // Ensure safe access
  }));
  
const barChartData =  months.map((month, index) => ({
  month,
  mobile:  chartData?.total_volumes[index]?.[1] ?? 0, 
  desktop: chartData?.total_volumes[index]?.[0] ?? 0,  
}));
  
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const barChartConfig = {
    desktop: {
      label: "Desktop",
      color: "rgba(157, 98, 217, 1)"

    },
    mobile: {
      label: "Mobil",
      color: "rgba(179, 116, 242, 0.01)"
    }
  };
  
  const [defaultMarket, setDefaultMarket] = useState("market_cap_desc");
  const [ChartNameBasedOnInput, setChartNameBasedOnInput] = useState("Bitcoin");
  const [SymbolName, setSymbolName] = useState("BTC");
  useEffect(() => {
    dispatch(fetchTableChart({defaultMarket, chartCurrencyEPage}));
  }, [dispatch, defaultMarket, chartCurrencyEPage]);
  
  return (
    <div className="coinLandingPageContainer">
      <div style={{ display: "flex", justifyContent: "center"}}>
      <Carousel style={{ width: "1100px"}}>
      <CarouselContent >
        {tableChart?.map((data) => (
          <CarouselItem key={data.id}>
            <div className="bg-carouselBackground" style={{ borderRadius: "6px", paddingRight: "20px"}}>
              <Card style={{ display: "flex"}}> 
                <div style={{ display: "flex", alignItems: "center", paddingRight: "15px"}}>
                  <img width={35} height={35} src={data.image}/>
                </div>
                <div> 
                  <div>
                  <span onClick={(e) => {setCharNameEPage(e.currentTarget.innerText), setChartNameBasedOnInput(e.currentTarget.innerText), setSymbolName(data.symbol);}}>{data.name}</span>
                  <span>({data.symbol.toLocaleUpperCase()})</span>
                  </div>
                  <span style={{ display: "flex"}}> 
                    <ShowCoinPricesInUsDollars 
                        cryptoPricesInUsDollars={data?.current_price}
                      />
                      <div style={{
                       
                        fontSize: "15px",
                        paddingLeft: "10px",
                        display: "flex",
                        color:
                          data.price_change_percentage_1h_in_currency >= 0
                            ? "#00FC2A"
                            : "#FE1040",
                      }}>
                        {data.price_change_percentage_1h_in_currency >= 0 ? (
                        <svg
                        width={5}
                        height={5}
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
                        width={5}
                        height={5}
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
      <CarouselPrevious style={{ background: "rgba(120, 120, 250, 1)"}}/>
      <CarouselNext style={{ background: "rgba(120, 120, 250, 1)"}}/>
    </Carousel>
    </div>
      <Flex>
    <Card style={{ width: 700}}>
      <CardHeader>
        <CardTitle>{ChartNameBasedOnInput}({SymbolName.toLocaleUpperCase()})</CardTitle>
        <CardDescription>      
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartDataRecharts}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
     <CardFooter>
      
      </CardFooter> 
    </Card>

    <Card style={{ width: 700}}>
      <CardHeader>
        <CardTitle>Volume 24h</CardTitle>
        <CardDescription></CardDescription>
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
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
      </Flex>
      <ContainerForTableChart>
        <Table>
          <TableCaption>TOP 50 BY Market CAP</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => setDefaultMarket("id_asc")}
                >
                Name
              </TableHead>
              <TableHead
                onClick={() => setDefaultMarket("market_cap_asc")}
             
              >
                Price
              </TableHead>
              <TableHead
                onClick={() => setDefaultMarket("1h")}
              
              >
                1h
              </TableHead>
              <TableHead
                onClick={() =>  setDefaultMarket("24h")}
             
              >
                24h
              </TableHead>
              <TableHead>
                7d
              </TableHead>
              <TableHead>24h Vol / Market Cap</TableHead>
              <TableHead>
                Circulating / Total Sup
              </TableHead>
              <TableHead style={{ textAlign: "center" }}>Last 7d</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableChart?.map((data) => (  
               <TableRow  style={{ borderTop: "solid 4px background", borderRadius: "25px" }} className="bg-carouselBackground" key={data.id}>
                 <TableCell style={{ display: "flex", height: "60px", alignItems: "center"}} className="font-medium">                   
                   <Image
                     src={data.image}
                     alt="Image not found"
                     height={20}
                     width={20}
                   />
                   <Link style={{paddingLeft: "10px"}} href={`/coin/${data.name.toLocaleLowerCase()}`}>
                     {data.name}({data.symbol.toLocaleUpperCase()})
                   </Link>
                 </TableCell>
                 <TableCell>
                   <ShowCoinPricesInUsDollars
                     cryptoPricesInUsDollars={data?.current_price}
                   />
                 </TableCell>
                 <TableCell
                   style={{
                   
                     color:
                       data.price_change_percentage_1h_in_currency >= 0
                         ? "#00FC2A"
                         : "#FE1040",
                   }}
                 >
                   {data.price_change_percentage_1h_in_currency >= 0 ? (
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
                   {Math.abs(
                     data.price_change_percentage_1h_in_currency
                   ).toFixed(2)}
                   %
                 </TableCell>
                 <TableCell
                   style={{
                     
                     color:
                       data.price_change_percentage_24h >= 0
                         ? "#00FC2A"
                         : "#FE1040",
                   }}
                 >
                   {data.price_change_percentage_24h >= 0 ? (
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
                   {Math.abs(data.price_change_percentage_24h).toFixed(2)}%
                 </TableCell>
                 <TableCell
                   style={{
                    
                     color:
                       data.price_change_percentage_7d_in_currency >= 0
                         ? "#00FC2A"
                         : "#FE1040",
                   }}
                 >
                   {data.price_change_percentage_7d_in_currency >= 0 ? (
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
                   <Container
                     style={{
                       width: 200,
                     }}
                   >
                     <Progress
                       style={{
                         width: (data.total_volume / data.market_cap) * 100,
                       }}
                     />
                   </Container>
                 </TableCell>
                 <TableCell>
                   <ShowMarketNumbersInCompactForm
                     marketNumbers={data?.circulating_supply}
                   />
                   -
                   <ShowMarketNumbersInCompactForm
                     marketNumbers={data?.total_supply}
                   />
                   <Container
                     style={{
                       width: 200,
                     }}
                   >
                     <Progress
                       style={{
                         width:
                           (data.circulating_supply / data.total_volume) *
                           100,
                       }}
                     />
                   </Container>
                 </TableCell>
                 <TableCell>
                   <div
                     style={{
                       width: 120,
                       height: 37,
                     }}
                   >
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
        </ContainerForTableChart> 
        </div>
  );
}

export default List;
