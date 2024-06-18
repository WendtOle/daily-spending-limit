import { useEffect, useState } from "react";
import {
  LocalStorageKey,
  readFromLocalStorage,
  writeNewHistoryEntry,
} from "./localstorage";

export const useLocalstorageValues = () => {
  const [currentBudget, setAccountBalance] = useState<number | undefined>();
  const [nullableOffset, setOffset] = useState<number | undefined>();
  const [startBudget, setStartBudget] = useState<number | undefined>();
  const [thirdMonthMode, setThirdMonthMode] = useState<boolean>(false);
  const [futureExpenses, setFutureExpenses] = useState<number | undefined>();

  useEffect(() => {
    const updateValues = () => {
      const {
        currentBudget,
        budgetOffset,
        startBudget,
        thirdMonthMode,
        futureExpenses,
      } = readFromLocalStorage();
      setAccountBalance(currentBudget);
      setOffset(budgetOffset);
      setStartBudget(startBudget);
      setThirdMonthMode(thirdMonthMode);
      setFutureExpenses(futureExpenses);
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
  const handleFutureExpensesChange = (value: number) => {
    setFutureExpenses(value);
    localStorage.setItem(
      LocalStorageKey.FUTURE_EXPENSES,
      JSON.stringify({ value, creationDay: new Date().getDate() })
    );
    window.dispatchEvent(new StorageEvent("storage"));
  };
  const handleCurrentBudgetChange = (value: number) => {
    writeNewHistoryEntry(value);
    setAccountBalance(value);
    localStorage.setItem(LocalStorageKey.CURRENT_BUDGET, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };

  return {
    currentBudget,
    setBalance: handleCurrentBudgetChange,
    offset: nullableOffset ?? 0,
    setOffset: handleBudgetOffsetChange,
    startBudget,
    setStartBudget: handleStartBudgetChange,
    thirdMonthMode,
    setThirdMonthMode: handleThridMonthModeChange,
    futureExpenses: futureExpenses ?? 0,
    setFutureExpenses: handleFutureExpensesChange,
  };
};
