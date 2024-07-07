import { getPeriod as importedGetPeriod } from "./lastDayOfMonth";

export const round = (value: number) => parseFloat(value.toFixed(1));

export const getPeriod = (date: Date) => {
  const today = date.getDate();
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

interface GetAvailableBudgetProps {
  currentBudget: number;
  offset: number;
  futureExpenses: number;
}

export const getAvailableBudget = ({
  currentBudget,
  offset,
  futureExpenses,
}: GetAvailableBudgetProps) => currentBudget - offset - futureExpenses;

interface GetCurrentDSLProps {
  startBudget: number;
  doneWithoutToday: number;
  availableBudget: number;
}

export const getCurrentDSL = ({
  startBudget,
  doneWithoutToday,
  availableBudget,
}: GetCurrentDSLProps) => {
  if (availableBudget >= startBudget) {
    return 0;
  }
  return (startBudget - availableBudget) / Math.max(doneWithoutToday, 1);
};

interface GetYouShouldDSLProps {
  leftWithToday: number;
  availableBudget: number;
}

export const getYouShouldTargetDSL = ({
  leftWithToday,
  availableBudget,
}: GetYouShouldDSLProps) => availableBudget / leftWithToday;

interface GetIdealDSLProps {
  startBudget: number;
  periodLength: number;
}

export const getIdealDSL = ({ startBudget, periodLength }: GetIdealDSLProps) =>
  startBudget / periodLength;
