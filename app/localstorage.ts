import { History } from "./types";

export enum LocalStorageKey {
  HISTORY = "history",
  CURRENT_BUDGET = "currentBudget",
  BUDGET_OFFSET = "budgetOffset",
  START_BUDGET = "startBudget",
  THIRD_MONTH_MODE = "thirdMonthMode",
}

export const readFromLocalStorage = (): {
  currentBudget: number | undefined;
  startBudget: number | undefined;
  budgetOffset: number | undefined;
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
    currentBudget: nullableCurrentBudget ? +nullableCurrentBudget : undefined,
    startBudget: nullableStartBudget ? +nullableStartBudget : undefined,
    budgetOffset: nullableBudgetOffset ? +nullableBudgetOffset : undefined,
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
