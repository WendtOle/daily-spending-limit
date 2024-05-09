"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  LayoutPosition,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { lastDayOfMonth } from "./lastDayOfMonth";
import Annotation from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Annotation
);

interface ChartProps {
  current: number;
  start: number | undefined;
  offset: number | undefined;
  history: Record<string, number>;
}

export default function MarketChart({
  current,
  start,
  offset,
  history,
}: ChartProps) {
  const labels = Array.from(Array(lastDayOfMonth() + 2).keys());

  const getEndProjection = () => {
    if (start === undefined) return;
    const today = new Date().getDate();
    const spend = start - current;
    const actualDSL = spend / today;
    return start - lastDayOfMonth() * actualDSL;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: labels.map((label) => {
          const key = Object.keys(history).find(
            (key) => key.split(".")[0] === label.toString()
          );
          if (!key) return null;
          return history[key] ?? null;
        }),
        label: "Actual data points",
        borderColor: "blue",
      },
      {
        data: labels.map((_, i) => {
          if (start === undefined) {
            return null;
          }
          if (i === 0) {
            return start;
          }
          if (i === labels.length - 1) {
            return getEndProjection();
          }
        }),
        label: "Current DSL",
        borderColor: "red",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: { max: 32, min: 0, ticks: { stepSize: 1 } },
      y: { min: 0, ticks: { stepSize: 100 } },
    },
    spanGaps: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as LayoutPosition,
      },
      annotation: {
        annotations: [
          {
            id: "a-line-1",
            type: "line" as any,
            mode: "horizontal" as any,
            scaleID: "y",
            value: offset,
            borderColor: "green",
            borderWidth: 1,
            label: {
              content: "Budget offset",
              enabled: true,
            },
          },
        ],
      },
    },
    layout: {
      padding: 0,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-72">
      <Line data={data} options={options} />
    </div>
  );
}
