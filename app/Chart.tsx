"use client";
import { getPeriod } from "./lastDayOfMonth";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { useState } from "react";
import { CustomBarChart } from "./CustomBarChart";

interface ChartProps {
  current: number;
}

export default function Chart({ current }: ChartProps) {
  const [start, setStartBudget] = useState<number | undefined>(undefined);
  const [nullableOffset, setBudgetOffset] = useState<number | undefined>(
    undefined
  );
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
  if (Object.keys(history).length < 2 && !start && !nullableOffset) {
    return null;
  }
  const { start: startPeriod, end: endPeriod } = getPeriod(thirdMonthMode);
  const today = new Date().getDate();
  const length = endPeriod - startPeriod;
  const leftPeriod = endPeriod - today;
  const donePeriod = length - leftPeriod;

  const getMoneyBarChar = () => {
    if (!start) {
      return null;
    }
    const offset = nullableOffset ?? 0;
    const moneySpent = start - current;
    const moneyLeft = start - moneySpent - offset;
    return <CustomBarChart left={moneySpent} right={moneyLeft} unit="€" />;
  };

  return (
    <div className="w-96 space-y-3">
      <CustomBarChart
        left={donePeriod}
        right={leftPeriod}
        unit="days"
        legendTop
      />
      {getMoneyBarChar()}
    </div>
  );
}
