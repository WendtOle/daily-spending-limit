"use client";
import { getLeftMoney, getPeriod, getSpentMoney } from "../calculations";
import { CustomBarChart } from "../CustomBarChart";
import { ModalType } from "../modal/Modals";
import { ChartTypes } from "../chartEntries";
import { ChartOptionButtons } from "../ChartOptionButtons";
import { useBudgetStore } from "../budgetStore";

export default function Chart() {
  const { budgetOffset, startBudget: start, currentBudget: current, pendingFixedCosts } = useBudgetStore()

  if (!start || !current) {
    return null;
  }
  const { done: donePeriod, left: leftPeriod } = getPeriod(new Date());

  const getMoneyBarChar = () => {
    if (!start) {
      return null;
    }
    const leftMoney = getLeftMoney({
      currentBudget: current,
      offset: budgetOffset,
      futureExpenses: pendingFixedCosts,
    });
    const spentMoney = getSpentMoney({
      startBudget: start,
      leftMoney,
    });
    return (
      <CustomBarChart
        left={Math.max(spentMoney, 0)}
        right={leftMoney}
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
