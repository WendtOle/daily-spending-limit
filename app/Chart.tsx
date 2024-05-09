"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { lastDayOfMonth } from "./lastDayOfMonth";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
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
      },
      {
        data: labels.map((label, i) => {
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
      },
    ],
  };

  const options = {
    scales: {
      x: { max: 32, min: 0, ticks: { stepSize: 1 } },
      y: { min: 0, ticks: { stepSize: 100 } },
    },
    spanGaps: true,
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
