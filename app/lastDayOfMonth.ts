export const lastDayOfPeriod = (thirdMonthMode: boolean) => {
  if (thirdMonthMode) {
    if (new Date().getDay() < 10) {
      return 10;
    }
    if (new Date().getDay() < 20) {
      return 20;
    }
  }
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
};
