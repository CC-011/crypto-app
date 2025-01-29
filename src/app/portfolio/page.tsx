"use client";
import React from "react";
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
  Filler, // Required for filling the area under the line
} from "chart.js";

// Register required components for Chart.js
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

 export default function Home() {
  const rawData = [
    { year: 2020, count: 100 },
    { year: 2021, count: 200 },
  ];

  // Transform raw data into ChartData
  const chartData = {
    labels: rawData.map((item) => item.year.toString()), // Convert years to strings for labels
    datasets: [
      {
        label: "Counts",
        data: rawData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        borderWidth: 2,
        tension: 0.4, // Smooth curve
        fill: true, // Enable area filling
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Yearly Counts (Area Chart)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };
      return (
      <main>
        <h1>portfolio page</h1>
        <div>
           <Line
          data={chartData} options={options}  />
        </div>
      </main>
    );
  }