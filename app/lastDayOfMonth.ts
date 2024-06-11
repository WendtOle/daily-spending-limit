export const getPeriod = (
  thirdMonthMode: boolean
): { start: number; end: number } => {
  const day = new Date().getDate();
  if (thirdMonthMode) {
    if (day < 10) {
      return { start: 0, end: 10 };
    }
    if (day < 20) {
      return { start: 10, end: 20 };
    }
  }
  const today = new Date();
  return {
    start: 20,
    end: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
  };
};
