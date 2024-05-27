import { useEffect, useState } from "react";
import Input from "./Input";
import { LocalStorageKey, readFromLocalStorage } from "./localstorage";
export const SETTINGS_MODAL_ID = "settings-modal-id";

export const SettingsModal = () => {
  const [startBudget, setStartBudget] = useState<number>(0);
  const [budgetOffset, setBudgetOffset] = useState<number>(0);

  useEffect(() => {
    const { startBudget, budgetOffset } = readFromLocalStorage();
    setStartBudget(startBudget ?? 0);
    setBudgetOffset(budgetOffset ?? 0);
  }, []);

  const handleStartBudgetChange = (value: number) => {
    setStartBudget(value);
    localStorage.setItem(LocalStorageKey.START_BUDGET, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };
  const handleBudgetOffsetChange = (value: number) => {
    setBudgetOffset(value);
    localStorage.setItem(LocalStorageKey.BUDGET_OFFSET, value.toString());
    window.dispatchEvent(new StorageEvent("storage"));
  };

  return (
    <div
      className="p-8 shadow-xl modal rounded"
      id={SETTINGS_MODAL_ID}
      // @ts-ignore
      popover="auto"
    >
      <h1 className="text-xl">Settings</h1>
      <Input
        label="Budget offset"
        value={budgetOffset}
        setValue={handleBudgetOffsetChange}
      />
      <Input
        label="Start budget"
        value={startBudget}
        setValue={handleStartBudgetChange}
      />
    </div>
  );
};
