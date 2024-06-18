"use client";
import { getPeriod } from "./lastDayOfMonth";
import { CustomBarChart } from "./CustomBarChart";
import { useLocalstorageValues } from "./useLocalstorageValues";

export default function Chart() {
  const {
    offset,
    startBudget: start,
    thirdMonthMode,
    currentBudget: current,
    futureExpenses,
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
    const moneySpent = start - current + futureExpenses;
    const moneyLeft = start - moneySpent - offset;
    return (
      <CustomBarChart left={moneySpent} right={moneyLeft} unit="€" legendTop />
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
    </div>
  );
}
