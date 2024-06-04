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
import { lastDayOfPeriod } from "./lastDayOfMonth";
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
  history: Record<string, number>;
}

export default function Chart({ current, history }: ChartProps) {
  const [start, setStartBudget] = useState<number | undefined>(undefined);
  const [offset, setBudgetOffset] = useState<number | undefined>(undefined);
  const [thirdMonthMode, setThirdMonthMode] = useState<boolean>(false);
  useEffect(() => {
    const update = () => {
      const { startBudget, budgetOffset, thirdMonthMode } =
        readFromLocalStorage();
      setStartBudget(startBudget);
      setBudgetOffset(budgetOffset);
      setThirdMonthMode(thirdMonthMode);
    };
    update();
    window.addEventListener("storage", update);
  }, []);
  if (Object.keys(history).length < 2 && !start && !offset) {
    return null;
  }
  const labels = Array.from(Array(lastDayOfPeriod(thirdMonthMode) + 2).keys());

  const today = new Date().getDate();
  const getDSL = (day: number, spend: number) => spend / day;
  const actualDSL = start ? getDSL(today, start - current) : undefined;
  function notUndefined<T>(value: T | undefined): value is T {
    return value !== undefined;
  }
  const individualDSLs = Object.entries(history)
    .map(([key, value]) => {
      if (!start) {
        return undefined;
      }
      return getDSL(+key, start - value);
    })
    .filter(notUndefined);
  const averageDSL =
    individualDSLs.length === 0
      ? undefined
      : individualDSLs.reduce((acc, dsl) => acc + (dsl as number), 0) /
        individualDSLs.length;

  const getEndProjection = (dsl?: number) => {
    if (!start || !dsl || dsl < 0) return;
    return start - lastDayOfPeriod(thirdMonthMode) * dsl;
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
          if (i === labels.length - 1) {
            return getEndProjection(actualDSL);
          }
        }),
        label: "Current DSL",
        borderColor: "red",
        borderWidth: 2,
        display: false,
      },

      {
        data: labels.map((_, i) => {
          if (start === undefined || start === 0 || averageDSL === undefined) {
            return null;
          }
          if (i === 0) {
            return start;
          }
          if (i === labels.length - 1) {
            return getEndProjection(averageDSL);
          }
        }),
        label: "Average DSL",
        borderColor: "orange",
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
        display: true,
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
