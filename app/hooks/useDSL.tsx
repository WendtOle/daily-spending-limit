import { round } from "../calculations";
import { getPeriod } from "../calculations";

interface UseDSLProps {
  startBudget: number;
  currentBudget: number;
  offset: number;
  futureExpenses: number;
  today: Date;
}

export const useDSL = ({
  startBudget,
  currentBudget,
  offset: budgetOffset,
  futureExpenses,
  today: todayDate,
}: UseDSLProps) => {
  const {
    length: periodLength,
    left: leftPeriod,
    done: donePeriod,
  } = getPeriod(todayDate);

  const actualCurrentBudget = currentBudget - budgetOffset - futureExpenses;

  const actualStartBudget = startBudget;

  const idealDSL = round(actualStartBudget / periodLength);
  if (leftPeriod < 0) {
    throw new Error("leftPeriod is negative");
  }
  const youShouldTargetDSL =
    leftPeriod === 0
      ? actualCurrentBudget
      : round(actualCurrentBudget / (leftPeriod + 1));
  const actualSpendUntilNow =
    actualStartBudget > actualCurrentBudget
      ? actualStartBudget - actualCurrentBudget
      : undefined;
  const actualCurrentDSL = actualSpendUntilNow
    ? round(actualSpendUntilNow / Math.max(donePeriod - 1, 1))
    : 0;

  const isTense = actualCurrentDSL > idealDSL;

  return { idealDSL, youShouldTargetDSL, actualCurrentDSL, isTense };
};
