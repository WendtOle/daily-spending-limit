import { History } from "./types";

export enum LocalStorageKey {
  HISTORY = "history",
  CURRENT_BUDGET = "currentBudget",
  BUDGET_OFFSET = "budgetOffset",
  START_BUDGET = "startBudget",
  THIRD_MONTH_MODE = "thirdMonthMode",
  DISMISSED_WELCOME_MODAL = "dismissedWelcomeModal",
  PENDING = "pending",
}

const DEFAULT_VALLUES = {
  currentBudget: 758,
  startBudget: 1000,
  budgetOffset: 0,
};

export interface Pending {
  value: number;
  clearingDay: number;
  repeatsEveryMonth: boolean;
  id: string;
}

export const readFromLocalStorage = (): {
  currentBudget: number;
  startBudget: number;
  budgetOffset: number;
  history: History;
  thirdMonthMode: boolean;
  dismissedWelcomeModal: boolean;
  pending: Pending[];
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

  purgeOutdatedPendingEntries();
  const nullablePendingString = localStorage.getItem(LocalStorageKey.PENDING);
  const pending: Pending[] = nullablePendingString
    ? JSON.parse(nullablePendingString)
    : [];
  const rawHistory = localStorage.getItem(LocalStorageKey.HISTORY);
  const history: History = JSON.parse(rawHistory ?? "{}");
  const nullableThirdMonthMode = localStorage.getItem(
    LocalStorageKey.THIRD_MONTH_MODE
  );
  const nullableDismissedWelcomeModal = localStorage.getItem(
    LocalStorageKey.DISMISSED_WELCOME_MODAL
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
    dismissedWelcomeModal: nullableDismissedWelcomeModal === "true",
    pending,
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

export const addPendingEntry = (pending: Pending) => {
  const rawPending = localStorage.getItem(LocalStorageKey.PENDING);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  parsedPending.push(pending);
  localStorage.setItem(LocalStorageKey.PENDING, JSON.stringify(parsedPending));
  window.dispatchEvent(new StorageEvent("storage"));
  purgeOutdatedPendingEntries();
};

export const deletePendingEntry = (uid: string) => {
  const rawPending = localStorage.getItem(LocalStorageKey.PENDING);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  localStorage.setItem(
    LocalStorageKey.PENDING,
    JSON.stringify(parsedPending.filter((entry) => entry.id !== uid))
  );
  window.dispatchEvent(new StorageEvent("storage"));
  purgeOutdatedPendingEntries();
};

const purgeOutdatedPendingEntries = () => {
  return;
  /*
  const rawPending = localStorage.getItem(LocalStorageKey.PENDING);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  const today = new Date().getDate();
  const updatedPending = parsedPending.filter(
    (entry) => entry.clearingDay > today || entry.repeatsEveryMonth
  );
  localStorage.setItem(LocalStorageKey.PENDING, JSON.stringify(updatedPending));
  window.dispatchEvent(new StorageEvent("storage"));
  */
};
