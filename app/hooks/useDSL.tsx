import {
  getCurrentDSL,
  getIdealDSL,
  getYouShouldTargetDSL,
  round,
  getLeftMoney,
  getSpentMoney,
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
  const leftMoney = getLeftMoney({
    currentBudget,
    offset: budgetOffset,
    futureExpenses,
  });
  const spentMoney = getSpentMoney({ startBudget, leftMoney });

  const youShouldTarget = getYouShouldTargetDSL({
    leftWithToday,
    leftMoney,
  });

  const current = getCurrentDSL({
    spentMoney,
    doneWithoutToday,
  });

  return {
    idealDSL: round(ideal),
    youShouldTargetDSL: round(youShouldTarget),
    actualCurrentDSL: round(current),
    isTense: current > ideal,
  };
};
