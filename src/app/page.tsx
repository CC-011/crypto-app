"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "./lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";
import { fetchChartData } from "./landingPageChart/landingPageChart";
import { fetchTableChart } from "./tableChart/table";
import { Line } from "react-chartjs-2";
import { 
  Flex, 
  ContainerForTableChart,
  Table,
  TableCaption
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
        tension: 0.4,  
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
  const tableChartForCoins = {
    labels:  tableChart?.map((data: any, i: any) =>  i),
    datasets: [
      {
        data: tableChart?.map((data: any) => data.sparkline_in_7d.price),
        fill: false,
        label: "Volume traded",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
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
            <TableCell>{data.high_24h}</TableCell>
            <TableCell>{data.price_change_percentage_1h_in_currency}</TableCell>
            <TableCell className="text-right">{data.price_change_24h}</TableCell>
            <TableCell className="text-right">{data.price_change_percentage_7d_in_currency}</TableCell>
            <TableCell className="text-right">{data.market_cap_change_24h}</TableCell>
            <TableCell className="text-right">{data.circulating_supply}</TableCell>
            <TableCell>
            <div style={{
        width: 150,
        height: 150}}>
            <Line 
          data={tableChartForCoins} options={options}  />
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

