"use client";
import { getPeriod } from "../lastDayOfMonth";
import { CustomBarChart } from "../CustomBarChart";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { FaCalculator, FaCircleQuestion } from "react-icons/fa6";
import { OpenModalButton } from "../OpenModalButton";
import { ModalType, getExplanationModalId } from "../modal/Modals";
import { ChartTypes } from "../chartEntries";

export default function Chart() {
  const {
    offset,
    startBudget: start,
    thirdMonthMode,
    currentBudget: current,
    pendingTotal,
    history,
  } = useLocalstorageValues();

  if ((Object.keys(history).length < 2 && !start) || !current) {
    return null;
  }
  const { start: startPeriod, end: endPeriod } = getPeriod(
    thirdMonthMode,
    new Date()
  );
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
      <div className="absolute -top-8 right-0 flex flex-row space-x-2">
        <OpenModalButton id={ModalType.TIME_CHART_CALCULATIONS}>
          <FaCalculator size={25} className="text-slate-600" />
        </OpenModalButton>
        <OpenModalButton id={getExplanationModalId(ChartTypes.TIME_CHART)}>
          <FaCircleQuestion size={25} className="text-slate-600" />
        </OpenModalButton>
      </div>

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
