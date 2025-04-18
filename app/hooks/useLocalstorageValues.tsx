import { useEffect, useState } from "react";
import {
  LocalStorageKey,
  readFromLocalStorage,
  writeNewHistoryEntry,
} from "../localstorage";
import { History } from "../types";
import { Pending } from "../pendingUtils";

export const useLocalstorageValues = () => {
  const [currentBudget, setAccountBalance] = useState<number | undefined>();
  const [nullableOffset, setOffset] = useState<number | undefined>();
  const [startBudget, setStartBudget] = useState<number | undefined>();
  const [history, setHistory] = useState<History>({});
  const [pendingEntries, setPendingEntries] = useState<Pending[]>([]);
  const [allowPendingEntries, setAllowPendingEntries] = useState<boolean>(false);

  useEffect(() => {
    const updateValues = () => {
      const { currentBudget, budgetOffset, startBudget, history, pending, allowPendingEntries
       } =
        readFromLocalStorage();
      setAccountBalance(currentBudget);
      setOffset(budgetOffset);
      setStartBudget(startBudget);
      setHistory(history);
      setPendingEntries(pending);
      setAllowPendingEntries(allowPendingEntries);
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

  const handleCurrentBudgetChange = (value: number) => {
    writeNewHistoryEntry(value);
    setAccountBalance(value);
    localStorage.setItem(LocalStorageKey.CURRENT_BUDGET, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };

  const handleAllowPendingEntriesChange = (value: boolean) => {
    setAllowPendingEntries(value)
    localStorage.setItem(LocalStorageKey.ALLOW_PENDING_ENTRIES, value ? "true" : "false")
    window.dispatchEvent(new StorageEvent("storage"))
  }

  const payedFixedCosts = pendingEntries
    .filter((entry) => entry.isPayed)
    .reduce((acc, entry) => acc + entry.value, 0);
  const pendingFixedCosts = pendingEntries
    .filter((entry) => !entry.isPayed)
    .reduce((acc, entry) => acc + entry.value, 0);

  return {
    currentBudget,
    setBalance: handleCurrentBudgetChange,
    offset: nullableOffset ?? 0,
    setOffset: handleBudgetOffsetChange,
    startBudget,
    setStartBudget: handleStartBudgetChange,
    history,
    pendingEntries,
    payedFixedCosts,
    pendingFixedCosts,
    allowPendingEntries,
    setAllowPendingEntries: handleAllowPendingEntriesChange
  };
};
