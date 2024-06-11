import { getPeriod } from "./lastDayOfMonth";

export const dayToEndOfPeriod = (thirdMonthMode: boolean) => {
  const today = new Date();
  return getPeriod(thirdMonthMode).end - today.getDate();
};
