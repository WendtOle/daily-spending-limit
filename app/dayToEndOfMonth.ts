import { lastDayOfMonth } from "./lastDayOfMonth";

export const dayToEndOfMonth = () => {
  const today = new Date();
  return lastDayOfMonth() - today.getDate();
};
