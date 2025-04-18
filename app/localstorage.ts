import { Pending } from "./pendingUtils";
import { History } from "./types";

export enum LocalStorageKey {
  HISTORY = "history",
  CURRENT_BUDGET = "currentBudget",
  BUDGET_OFFSET = "budgetOffset",
  START_BUDGET = "startBudget",
  DISMISSED_WELCOME_MODAL = "dismissedWelcomeModal",
  ALLOW_PENDING_ENTRIES = "allowPendingEntries",
  FIXED_COSTS = "fixedCosts",
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
  dismissedWelcomeModal: boolean;
  allowPendingEntries: boolean;
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

  const nullablePendingString = localStorage.getItem(
    LocalStorageKey.FIXED_COSTS
  );
  const pending: Pending[] = nullablePendingString
    ? JSON.parse(nullablePendingString)
    : [];
  const rawHistory = localStorage.getItem(LocalStorageKey.HISTORY);
  const history: History = JSON.parse(rawHistory ?? "{}");

  const nullableDismissedWelcomeModal = localStorage.getItem(
    LocalStorageKey.DISMISSED_WELCOME_MODAL
  );
  const nullableAllowPendingEntries = localStorage.getItem(
    LocalStorageKey.ALLOW_PENDING_ENTRIES
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
    dismissedWelcomeModal: nullableDismissedWelcomeModal === "true",
    allowPendingEntries: nullableAllowPendingEntries === "true",
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
