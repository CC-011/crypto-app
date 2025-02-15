"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "./lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";
import { fetchChartData } from "./landingPageChart/landingPageChart";
import { fetchTableChart } from "./tableChart/table";
import { Line, Chart } from "react-chartjs-2";
import { 
  Flex, 
  ContainerForTableChart,
  Table,
  TableCaption,
  Progress,
  Container
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
  ChartData
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

function List () {
  const dispatch = useAppDispatch();
  const { chartData } = useSelector((state: RootState) => state.chart);
  const { tableChart } = useSelector((state: RootState) => state.table);
  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]); 

  useEffect(() => {
    dispatch(fetchTableChart());
  }, [dispatch]);
 
  const chartDataL = {
    labels: chartData?.prices.map((data) => new Date(data[0] / 1000).getHours()), 
    datasets: [
      {
        data: chartData?.prices.map((data) => data[1]), 
        fill: true, 
        label: "Price",
        backgroundColor: "rgba(75, 192, 192, 0.2)", 
       borderColor: "rgba(75, 192, 192, 1)", 
       borderWidth: 2,
        tension: 0.9,  
      },
    ],
  };
  
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour",
        },
      },
      y: {
        beginAtZero: true, 
      },
    },
  };
  
  const data1 = {
    labels: chartData?.total_volumes.map((data) => new Date(data[0] / 1000).getHours()),
    datasets: [
      {
        data: chartData?.prices.map((data) => data),
        fill: false,
        label: "Volume traded",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  interface TablePropsData {
    dataProp?: number[];
  }

  const TableChartForCoins = ({ dataProp = [] }: TablePropsData) => {
    
    const chartData: ChartData<"line"> = { 
      labels: dataProp.map((data,_) => _),
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

  interface marketData {
    marketNumbers: number
  }

   const ShowMarketNumbersInCompactForm = ({ marketNumbers }: marketData) => {
   return (
    <>
      {new Intl.NumberFormat("en-US", { notation: "compact",
  compactDisplay: "short",} ).format(marketNumbers)}
    </>
   );
   };
   
  return (
    <div>
      <Flex style={{
        width: 700,
        height: 368
      }}>
        <Line
          data={chartDataL} options={options}  /> 
        <Line
          data={data1} options={options}  /> 
      </Flex>
      <ContainerForTableChart>
      <Table>
      <TableCaption>TOP 50 BY Market CAP</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead className="w-[100px]">1h</TableHead>
          <TableHead className="text-right">24</TableHead>
          <TableHead className="text-right">7d</TableHead>
          <TableHead className="text-right">24h Vol / Market Cap</TableHead>
          <TableHead className="text-right">Circulating / Total Sup</TableHead>
          <TableHead className="text-right">Last 7d</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
{tableChart?.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.name}
            <Image src={data.image} alt="Image not found" height={30} width={30}/>
            </TableCell>
            <TableCell>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(data.current_price)}
            </TableCell>
             <TableCell style={{ 
              color: data.price_change_percentage_1h_in_currency >= 0 ? "#00FC2A" : "#FE1040",
             }}>
             {data.price_change_percentage_1h_in_currency >= 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="#00FC2A" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /> </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="#FE1040" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /> </svg>}  
              {Math.abs(data.price_change_percentage_1h_in_currency).toFixed(2)}% 
             </TableCell>
                <TableCell style={{
                color: data.price_change_percentage_24h >= 0 ? "#00FC2A" : "#FE1040",
              }}>
                {data.price_change_percentage_24h >= 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="#00FC2A" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /> </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="#FE1040" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /> </svg>}
                {Math.abs(data.price_change_percentage_24h).toFixed(2)}%  
                </TableCell>
              <TableCell style={{ 
                color: data.price_change_percentage_7d_in_currency >= 0 ? "#00FC2A" : "#FE1040",
             }}>
              {data.price_change_percentage_7d_in_currency >= 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="#00FC2A" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /> </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="#FE1040" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /> </svg>} 
              {Math.abs(data.price_change_percentage_7d_in_currency).toFixed(2)}%     
              </TableCell>
            <TableCell>
           <ShowMarketNumbersInCompactForm marketNumbers={data?.total_volume} /> 
           -
           <ShowMarketNumbersInCompactForm marketNumbers={data?.market_cap} /> 
            <Container style={{
              width: 100
            }} >
            <Progress style={{
              width: data.total_volume / data.market_cap * 100 }} />
            </Container>
            </TableCell>
            <TableCell>
            <ShowMarketNumbersInCompactForm marketNumbers={data?.circulating_supply} />
            -
            <ShowMarketNumbersInCompactForm marketNumbers={data?.total_supply} /> 
              <Container style={{
              width: 100
            }} >
                <Progress style={{
                 width: data.circulating_supply / data.total_volume * 100
                }} />
              </Container>
            </TableCell>
            <TableCell>
            <div style={{
        width: 200,
        height: 200}}>
            <TableChartForCoins dataProp={data?.sparkline_in_7d.price} />
          </div>
          </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
    </ContainerForTableChart>
    </div>
  );
}

export default List;

