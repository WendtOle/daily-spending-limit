import { getPeriod } from "../lastDayOfMonth";

interface UseDSLProps {
  startBudget: number;
  currentBudget: number;
  offset: number;
  futureExpenses: number;
  today: Date;
  payedFixedCosts: number;
  pendingFixedCosts: number;
}

export const useDSL = ({
  startBudget,
  currentBudget,
  offset: budgetOffset,
  futureExpenses,
  today: todayDate,
  payedFixedCosts,
  pendingFixedCosts,
}: UseDSLProps) => {
  const { start: startPeriod, end: endPeriod } = getPeriod(todayDate);
  const today = todayDate.getDate();
  const periodLength = endPeriod - startPeriod;
  const leftPeriod = endPeriod - today;
  const donePeriod = periodLength - leftPeriod;

  const customRound = (value: number) => parseFloat(value.toFixed(1));

  const actualCurrentBudget = currentBudget - budgetOffset - futureExpenses;

  const actualStartBudget =
    startBudget - budgetOffset - payedFixedCosts - pendingFixedCosts;

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
    ? customRound(actualSpendUntilNow / Math.max(donePeriod - 1, 1))
    : 0;

  const isTense = actualCurrentDSL > idealDSL;

  return { idealDSL, youShouldTargetDSL, actualCurrentDSL, isTense };
};
