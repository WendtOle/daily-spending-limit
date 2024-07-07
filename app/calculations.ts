import { getPeriod as importedGetPeriod } from "./lastDayOfMonth";

export const round = (value: number) => parseFloat(value.toFixed(1));

export const getPeriod = (date: Date) => {
  const today = Math.max(date.getDate() - 1, 0);
  const { start: startPeriod, end: endPeriod } = importedGetPeriod(date);
  const periodLength = endPeriod - startPeriod;
  const leftPeriod = endPeriod - today;
  const donePeriod = periodLength - leftPeriod;
  return {
    start: startPeriod,
    end: endPeriod,
    length: periodLength,
    left: leftPeriod,
    done: donePeriod,
    today,
  };
};

interface GetLeftMoneyProps {
  currentBudget: number;
  offset: number;
  futureExpenses: number;
}

export const getLeftMoney = ({
  currentBudget,
  offset,
  futureExpenses,
}: GetLeftMoneyProps) => currentBudget - offset - futureExpenses;

interface GetSpentMoneyProps {
  startBudget: number;
  leftMoney: number;
}

export const getSpentMoney = ({ startBudget, leftMoney }: GetSpentMoneyProps) =>
  startBudget - leftMoney;

interface GetCurrentDSLProps {
  spentMoney: number;
  doneWithoutToday: number;
}

export const getCurrentDSL = ({
  doneWithoutToday,
  spentMoney,
}: GetCurrentDSLProps) => {
  if (spentMoney < 0) {
    return 0;
  }
  return spentMoney / Math.max(doneWithoutToday, 1);
};

interface GetYouShouldDSLProps {
  leftWithToday: number;
  leftMoney: number;
}

export const getYouShouldTargetDSL = ({
  leftWithToday,
  leftMoney,
}: GetYouShouldDSLProps) => leftMoney / leftWithToday;

interface GetIdealDSLProps {
  startBudget: number;
  periodLength: number;
}

export const getIdealDSL = ({ startBudget, periodLength }: GetIdealDSLProps) =>
  startBudget / periodLength;
