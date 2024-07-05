export const getPeriod = (today: Date): { start: number; end: number } => ({
  start: 0,
  end: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
});
