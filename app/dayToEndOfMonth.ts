import { getPeriod } from "./lastDayOfMonth";

export const dayToEndOfPeriod = () => {
  const today = new Date();
  return getPeriod(today).end - today.getDate();
};
