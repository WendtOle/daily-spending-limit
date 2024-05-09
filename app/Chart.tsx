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
  Align,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { lastDayOfMonth } from "./lastDayOfMonth";
import { dayToEndOfMonth } from "./dayToEndOfMonth";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function MarketChart() {
  const [history, setHistory] = useState<Record<string, number>>({});
  const [startBudget, setStartBudget] = useState<number | undefined>();
  const [budgetOffset, setBudgetOffset] = useState<number | undefined>();

  const labels = Array.from(Array(lastDayOfMonth() + 2).keys());

  useEffect(() => {
    const rawHistory = localStorage.getItem("history");
    const history: Record<string, number> = JSON.parse(rawHistory ?? "{}");
    setHistory(history);
    const startBudget = localStorage.getItem("startBudget");
    setStartBudget(startBudget ? +startBudget : undefined);
    const budgetOffset = localStorage.getItem("budgetOffset");
    setBudgetOffset(budgetOffset ? +budgetOffset : undefined);
  }, []);

  const { latest, latestValue } = labels.reduce(
    (acc, label) => {
      const key = Object.keys(history).find((key) => key === label.toString());
      if (!key) return acc;
      const keyAsNumber = +key;
      const value = history[keyAsNumber];
      if (keyAsNumber > acc.latest) {
        return { latest: keyAsNumber, latestValue: value };
      }
      return acc;
    },
    { latest: -1, latestValue: undefined } as {
      latest: number;
      latestValue: number | undefined;
    }
  );

  const getEndProjection = () => {
    if (latest === -1 || latestValue === undefined) return;
    if (startBudget === undefined) return;

    const spend = startBudget - latestValue;
    const actualDSL = Math.floor(spend / latest);
    return startBudget - lastDayOfMonth() * actualDSL;
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
          if (startBudget === undefined || budgetOffset === undefined) {
            return null;
          }
          if (i === 0) {
            return startBudget;
          }
          if (i === labels.length - 1) {
            return budgetOffset;
          }
        }),
        label: "Ideal DSL",
        borderColor: "green",
      },
      {
        data: labels.map((_, i) => {
          if (startBudget === undefined) {
            return null;
          }
          if (i === 0) {
            return startBudget;
          }
          if (i === labels.length - 1) {
            return getEndProjection();
          }
        }),
        label: "Current DSL",
        borderColor: "red",
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
        display: true,
        position: "bottom" as LayoutPosition,
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
