import { useEffect, useState } from "react";
import {
  LocalStorageKey,
  Pending,
  readFromLocalStorage,
  writeNewHistoryEntry,
} from "./localstorage";
import { History } from "./types";
import { getPeriod } from "./lastDayOfMonth";

export const useLocalstorageValues = () => {
  const [currentBudget, setAccountBalance] = useState<number | undefined>();
  const [nullableOffset, setOffset] = useState<number | undefined>();
  const [startBudget, setStartBudget] = useState<number | undefined>();
  const [thirdMonthMode, setThirdMonthMode] = useState<boolean>(false);
  const [history, setHistory] = useState<History>({});
  const [pendingEntries, setPendingEntries] = useState<Pending[]>([]);

  useEffect(() => {
    const updateValues = () => {
      const {
        currentBudget,
        budgetOffset,
        startBudget,
        thirdMonthMode,
        history,
        pending,
      } = readFromLocalStorage();
      setAccountBalance(currentBudget);
      setOffset(budgetOffset);
      setStartBudget(startBudget);
      setThirdMonthMode(thirdMonthMode);
      setHistory(history);
      setPendingEntries(pending);
    };
    window.addEventListener("storage", updateValues);
    updateValues();
  }, []);

  const handleStartBudgetChange = (value: number) => {
    setStartBudget(value);
    localStorage.setItem(LocalStorageKey.START_BUDGET, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };
  const handleBudgetOffsetChange = (value: number) => {
    setOffset(value);
    localStorage.setItem(LocalStorageKey.BUDGET_OFFSET, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };
  const handleThridMonthModeChange = (value: boolean) => {
    setThirdMonthMode(value);
    localStorage.setItem(LocalStorageKey.THIRD_MONTH_MODE, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };

  const handleCurrentBudgetChange = (value: number) => {
    writeNewHistoryEntry(value);
    setAccountBalance(value);
    localStorage.setItem(LocalStorageKey.CURRENT_BUDGET, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };

  const { start, end } = getPeriod(thirdMonthMode, new Date());
  const pendingTotal = pendingEntries
    .filter((entry) => start < entry.clearingDay && end >= entry.clearingDay)
    .reduce((acc, entry) => acc + entry.value, 0);

  return {
    currentBudget,
    setBalance: handleCurrentBudgetChange,
    offset: nullableOffset ?? 0,
    setOffset: handleBudgetOffsetChange,
    startBudget,
    setStartBudget: handleStartBudgetChange,
    thirdMonthMode,
    setThirdMonthMode: handleThridMonthModeChange,
    history,
    pendingEntries,
    pendingTotal,
  };
};
