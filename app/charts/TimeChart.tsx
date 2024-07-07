"use client";
import { getPeriod } from "../calculations";
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
    history,
    payedFixedCosts,
    pendingFixedCosts,
  } = useLocalstorageValues();

  if ((Object.keys(history).length < 2 && !start) || !current) {
    return null;
  }
  const { done: donePeriod, left: leftPeriod } = getPeriod(new Date());

  const getMoneyBarChar = () => {
    if (!start) {
      return null;
    }
    const moneySpent =
      start + offset + pendingFixedCosts + payedFixedCosts - current;
    const moneyLeft = current - offset - pendingFixedCosts;
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
