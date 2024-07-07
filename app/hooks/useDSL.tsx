import {
  getCurrentDSL,
  getIdealDSL,
  getYouShouldTargetDSL,
  round,
  getAvailableBudget,
} from "../calculations";
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
  const { length: periodLength, left, done } = getPeriod(todayDate);
  const leftWithToday = left + 1;
  const doneWithoutToday = done - 1;

  const ideal = getIdealDSL({ startBudget, periodLength });
  const available = getAvailableBudget({
    currentBudget,
    offset: budgetOffset,
    futureExpenses,
  });

  const youShouldTarget = getYouShouldTargetDSL({
    leftWithToday,
    availableBudget: available,
  });

  const current = getCurrentDSL({
    startBudget,
    availableBudget: available,
    doneWithoutToday,
  });

  return {
    idealDSL: round(ideal),
    youShouldTargetDSL: round(youShouldTarget),
    actualCurrentDSL: round(current),
    isTense: current > ideal,
  };
};
