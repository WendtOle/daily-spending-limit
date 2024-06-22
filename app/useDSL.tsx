import { getPeriod } from "./lastDayOfMonth";

interface UseDSLProps {
  startBudget: number;
  currentBudget: number;
  offset: number;
  thirdMonthMode: boolean;
  futureExpenses: number;
  today: Date;
}

export const useDSL = ({
  startBudget,
  currentBudget,
  thirdMonthMode,
  offset: budgetOffset,
  futureExpenses,
  today: todayDate,
}: UseDSLProps) => {
  const { start: startPeriod, end: endPeriod } = getPeriod(
    thirdMonthMode,
    todayDate
  );
  const today = todayDate.getDate();
  const periodLength = endPeriod - startPeriod + 1;
  const leftPeriod = endPeriod - today;
  const donePeriod = periodLength - leftPeriod;

  const customRound = (value: number) => parseFloat(value.toFixed(1));

  const actualCurrentBudget = currentBudget - budgetOffset - futureExpenses;

  const actualStartBudget = startBudget - budgetOffset;

  const idealDSL = customRound(actualStartBudget / periodLength);
  if (leftPeriod < 0) {
    throw new Error("leftPeriod is negative");
  }
  const youShouldTargetDSL =
    leftPeriod === 0
      ? actualCurrentBudget
      : customRound(actualCurrentBudget / (leftPeriod + 1));
  const actualSpendUntilNow =
    actualStartBudget > actualCurrentBudget
      ? actualStartBudget - actualCurrentBudget
      : undefined;
  const actualCurrentDSL = actualSpendUntilNow
    ? customRound(actualSpendUntilNow / Math.max(donePeriod, 1))
    : 0;

  return { idealDSL, youShouldTargetDSL, actualCurrentDSL };
};
