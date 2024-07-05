"use client";
import { getPeriod } from "../lastDayOfMonth";
import { CustomBarChart } from "../CustomBarChart";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ModalType } from "../modal/Modals";
import { ChartTypes } from "../chartEntries";
import { ChartOptionButtons } from "../ChartOptionButtons";

export default function Chart() {
  const {
    offset,
    startBudget: start,
    currentBudget: current,
    pendingTotal,
    history,
  } = useLocalstorageValues();

  if ((Object.keys(history).length < 2 && !start) || !current) {
    return null;
  }
  const { start: startPeriod, end: endPeriod } = getPeriod(new Date());
  const today = new Date().getDate();
  const length = endPeriod - startPeriod + 1;
  const leftPeriod = endPeriod - today + 1;
  const donePeriod = length - leftPeriod;

  const getMoneyBarChar = () => {
    if (!start) {
      return null;
    }
    const moneySpent = start - current + pendingTotal;
    const moneyLeft = start - moneySpent - offset;
    return (
      <CustomBarChart
        left={Math.max(moneySpent, 0)}
        right={moneyLeft}
        unit="€"
        legendTop
      />
    );
  };

  return (
    <div className="w-80 sm:w-96 relative">
      <ChartOptionButtons
        calculationModalId={ModalType.TIME_CHART_CALCULATIONS}
        chartType={ChartTypes.TIME_CHART}
      />
      <div className="space-y-2 ">
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
