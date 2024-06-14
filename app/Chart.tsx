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
import { Line } from "react-chartjs-2";
import { getPeriod } from "./lastDayOfMonth";
import Annotation from "chartjs-plugin-annotation";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { useState } from "react";

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
}

export default function Chart({ current }: ChartProps) {
  const [start, setStartBudget] = useState<number | undefined>(undefined);
  const [offset, setBudgetOffset] = useState<number | undefined>(undefined);
  const [thirdMonthMode, setThirdMonthMode] = useState<boolean>(false);
  const [history, setHistory] = useState<Record<string, number>>({});
  useEffect(() => {
    const update = () => {
      const {
        startBudget,
        budgetOffset,
        thirdMonthMode,
        history: fullHistory,
      } = readFromLocalStorage();
      setStartBudget(startBudget);
      setBudgetOffset(budgetOffset);
      setThirdMonthMode(thirdMonthMode);
      setHistory(fullHistory[new Date().getMonth()] ?? {});
    };
    update();
    window.addEventListener("storage", update);
  }, []);
  if (Object.keys(history).length < 2 && !start && !offset) {
    return null;
  }
  const { start: startPeriod, end: endPeriod } = getPeriod(thirdMonthMode);
  const labels = Array.from(Array(endPeriod - startPeriod + 2).keys()).map(
    (i) => i + startPeriod
  );

  const today = new Date().getDate();

  const data = {
    labels: labels,
    datasets: [
      {
        data: labels.map((label) => {
          if (label === today) {
            return current;
          }
          const key = Object.keys(history).find(
            (key) => key.split(".")[0] === label.toString()
          );
          if (!key) return null;
          return history[key] ?? null;
        }),
        label: "Actual data points",
        borderColor: "blue",
        showLine: false,
      },
      {
        data: labels.map((_, i) => {
          if (start === undefined || start === 0) {
            return null;
          }
          if (i === 0) {
            return start;
          }
          if (i === labels.length - 2) {
            return offset || 0;
          }
        }),
        label: "ideal DSL",
        borderColor: "green",
        borderWidth: 2,
        display: false,
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
            display: offset !== undefined && offset !== 0,
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
