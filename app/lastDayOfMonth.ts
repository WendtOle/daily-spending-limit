export const lastDayOfPeriod = (thirdMonthMode: boolean) => {
  const day = new Date().getDate();
  if (thirdMonthMode) {
    if (day < 10) {
      return 10;
    }
    if (day < 20) {
      return 20;
    }
  }
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
};
