import { getPeriod } from "./lastDayOfMonth";

export const dayToEndOfPeriod = (thirdMonthMode: boolean) => {
  const today = new Date();
  return getPeriod(thirdMonthMode, today).end - today.getDate();
};
