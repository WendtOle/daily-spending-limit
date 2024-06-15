import { History } from "./types";

export enum LocalStorageKey {
  HISTORY = "history",
  CURRENT_BUDGET = "currentBudget",
  BUDGET_OFFSET = "budgetOffset",
  START_BUDGET = "startBudget",
  THIRD_MONTH_MODE = "thirdMonthMode",
}

const DEFAULT_VALLUES = {
  currentBudget: 758,
  startBudget: 1000,
  budgetOffset: 0,
};

export const readFromLocalStorage = (): {
  currentBudget: number;
  startBudget: number;
  budgetOffset: number;
  history: History;
  thirdMonthMode: boolean;
} => {
  const nullableCurrentBudget = localStorage.getItem(
    LocalStorageKey.CURRENT_BUDGET
  );
  const nullableStartBudget = localStorage.getItem(
    LocalStorageKey.START_BUDGET
  );
  const nullableBudgetOffset = localStorage.getItem(
    LocalStorageKey.BUDGET_OFFSET
  );
  const rawHistory = localStorage.getItem(LocalStorageKey.HISTORY);
  const history: History = JSON.parse(rawHistory ?? "{}");
  const nullableThirdMonthMode = localStorage.getItem(
    LocalStorageKey.THIRD_MONTH_MODE
  );

  return {
    currentBudget: nullableCurrentBudget
      ? +nullableCurrentBudget
      : DEFAULT_VALLUES.currentBudget,
    startBudget: nullableStartBudget
      ? +nullableStartBudget
      : DEFAULT_VALLUES.startBudget,
    budgetOffset: nullableBudgetOffset
      ? +nullableBudgetOffset
      : DEFAULT_VALLUES.budgetOffset,
    history,
    thirdMonthMode: nullableThirdMonthMode === "true",
  };
};

export const writeNewHistoryEntry = (value: number): History => {
  const rawHistory = localStorage.getItem(LocalStorageKey.HISTORY);
  const history: History = JSON.parse(rawHistory ?? "{}");
  const month = new Date().getMonth();
  const updatedHistory = {
    ...history,
    [month]: { ...history[month], [new Date().getDate()]: value },
  };
  localStorage.setItem(LocalStorageKey.HISTORY, JSON.stringify(updatedHistory));
  return updatedHistory;
};
