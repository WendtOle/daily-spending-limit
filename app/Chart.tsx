"use client";
import { getPeriod } from "./lastDayOfMonth";
import { useEffect } from "react";
import { readFromLocalStorage } from "./localstorage";
import { useState } from "react";
import { CustomBarChart } from "./CustomBarChart";
import { DSLChart } from "./DSLChart";

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
    return (
      <CustomBarChart left={moneySpent} right={moneyLeft} unit="€" legendTop />
    );
  };

  const getDSLChart = ({
    currentBudget,
    budgetOffset,
    startBudget,
    daysDone,
    daysLeft,
    periodLength,
  }: {
    currentBudget: number;
    budgetOffset: number;
    startBudget?: number;
    daysLeft: number;
    daysDone: number;
    periodLength: number;
  }) => {
    if (!startBudget) {
      return null;
    }
    const actualCurrentBudget = currentBudget - budgetOffset;
    const actualStartBudget = startBudget - budgetOffset;
    const idealDSL = Math.floor(actualStartBudget / periodLength);
    const youShouldTargetDSL = Math.floor(actualCurrentBudget / daysLeft);
    const actualSpendUntilNow =
      actualStartBudget !== actualCurrentBudget
        ? actualStartBudget - actualCurrentBudget
        : undefined;
    const actualCurrentDSL = actualSpendUntilNow
      ? Math.floor(actualSpendUntilNow / Math.max(daysDone, 1))
      : 0;
    return (
      <DSLChart
        idealDSL={idealDSL}
        targetDSL={youShouldTargetDSL > idealDSL ? 0 : youShouldTargetDSL}
        actualDSL={actualCurrentDSL}
      />
    );
  };

  return (
    <div className="w-80 sm:w-96">
      <div className="space-y-2 my-8">
        {getMoneyBarChar()}
        <CustomBarChart left={donePeriod} right={leftPeriod} unit="days" />
      </div>
      {getDSLChart({
        currentBudget: current,
        budgetOffset: nullableOffset ?? 0,
        startBudget: start,
        daysDone: donePeriod,
        daysLeft: leftPeriod,
        periodLength: length,
      })}
    </div>
  );
}
