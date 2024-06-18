"use client";
import { getPeriod } from "./lastDayOfMonth";
import { CustomBarChart } from "./CustomBarChart";
import { DSLChart } from "./DSLChart";
import { useLocalstorageValues } from "./useLocalstorageValues";

export default function Chart() {
  const {
    offset,
    startBudget: start,
    thirdMonthMode,
    currentBudget: current,
  } = useLocalstorageValues();

  if ((Object.keys(history).length < 2 && !start) || !current) {
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
    const moneySpent = start - current;
    const moneyLeft = start - moneySpent - offset;
    return (
      <CustomBarChart left={moneySpent} right={moneyLeft} unit="€" legendTop />
    );
  };

  const customRound = (value: number) => parseFloat(value.toFixed(1));

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
    const idealDSL = customRound(actualStartBudget / periodLength);
    const youShouldTargetDSL = customRound(actualCurrentBudget / daysLeft);
    const actualSpendUntilNow =
      actualStartBudget !== actualCurrentBudget
        ? actualStartBudget - actualCurrentBudget
        : undefined;
    const actualCurrentDSL = actualSpendUntilNow
      ? customRound(actualSpendUntilNow / Math.max(daysDone, 1))
      : 0;
    return (
      <DSLChart
        idealDSL={idealDSL}
        targetDSL={youShouldTargetDSL}
        actualDSL={actualCurrentDSL}
      />
    );
  };

  return (
    <div className="w-80 sm:w-96">
      <div className="space-y-2 my-8">
        {getMoneyBarChar()}
        <CustomBarChart
          left={donePeriod}
          right={leftPeriod}
          unit="days"
          variant="second"
        />
      </div>
      {getDSLChart({
        currentBudget: current,
        budgetOffset: offset,
        startBudget: start,
        daysDone: donePeriod,
        daysLeft: leftPeriod,
        periodLength: length,
      })}
    </div>
  );
}
