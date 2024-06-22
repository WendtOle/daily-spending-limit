export const getPeriod = (
  thirdMonthMode: boolean,
  today: Date
): { start: number; end: number } => {
  const day = today.getDate();
  if (thirdMonthMode) {
    if (day <= 10) {
      return { start: 0, end: 10 };
    }
    if (day <= 20) {
      return { start: 11, end: 20 };
    }
  }
  return {
    start: thirdMonthMode ? 21 : 0,
    end: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
  };
};
