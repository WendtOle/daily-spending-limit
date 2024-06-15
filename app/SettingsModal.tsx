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
      className="p-8 pt-6 shadow-xl modal rounded space-y-6"
      id={SETTINGS_MODAL_ID}
      // @ts-ignore
      popover="auto"
    >
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Settings
      </h1>
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
      <div>
        <div className="flex flex-row items-center">
          <input
            className="w-6 h-6"
            type="checkbox"
            checked={thirdMonthMode}
            onChange={(e) => handleThridMonthModeChange(e.target.checked)}
          />
          <label className="font-medium text-gray-900 ml-2">Focus mode</label>
        </div>
        <div className="w-56 text-sm mt-2 ml-4">
          The focus mode helps to gain control over your daily spending by
          reducing the observed time period to 10 days. <br /> Obviously you
          should adjust the value for <i>budget offset</i> and{" "}
          <i>start budget</i> accordingly.
        </div>
      </div>
    </div>
  );
};
