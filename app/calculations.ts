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
