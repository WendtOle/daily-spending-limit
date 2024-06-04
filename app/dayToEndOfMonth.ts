import { lastDayOfPeriod } from "./lastDayOfMonth";

export const dayToEndOfPeriod = (thirdMonthMode: boolean) => {
  const today = new Date();
  return lastDayOfPeriod(thirdMonthMode) - today.getDate();
};
