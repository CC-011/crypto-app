"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "./lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store";
import { fetchChartData } from "./landingPageChart/landingPageChart";
import { Line } from "react-chartjs-2";
import { Flex } from "./styledComponents/styles";
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

function List () {
  const dispatch = useAppDispatch();

  const { chartData } = useSelector((state: RootState) => state.chart);

  useEffect(() => {
    dispatch(fetchChartData());
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
        data: chartData?.prices.map((data) => data[1]),
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
        height: 700
      }}>
        <Line
          data={chartDataL} options={options}  /> 
        <Line
          data={data1} options={options}  /> 
      </Flex>
      
    </div>
  );
}

export default List;

