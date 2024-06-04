import { useEffect, useState } from "react";
import Input from "./Input";
import { LocalStorageKey, readFromLocalStorage } from "./localstorage";
export const SETTINGS_MODAL_ID = "settings-modal-id";

export const SettingsModal = () => {
  const [startBudget, setStartBudget] = useState<number>(0);
  const [budgetOffset, setBudgetOffset] = useState<number>(0);
  const [thirdMonthMode, setThirdMonthMode] = useState<boolean>(false);

  useEffect(() => {
    const { startBudget, budgetOffset, thirdMonthMode } =
      readFromLocalStorage();
    setStartBudget(startBudget ?? 0);
    setBudgetOffset(budgetOffset ?? 0);
    setThirdMonthMode(thirdMonthMode);
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
  const handleThridMonthModeChange = (value: boolean) => {
    setThirdMonthMode(value);
    localStorage.setItem(LocalStorageKey.THIRD_MONTH_MODE, value.toString());
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
      <div className="flex flex-col items-start space-y-1 mt-2">
        <label className="font-medium text-gray-900">Third-month-mode</label>
        <input
          type="checkbox"
          checked={thirdMonthMode}
          onChange={(e) => handleThridMonthModeChange(e.target.checked)}
        />
      </div>
    </div>
  );
};
