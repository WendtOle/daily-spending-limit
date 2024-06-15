"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import { getDate } from "./getDate";
import Chart from "./Chart";
import {
  LocalStorageKey,
  readFromLocalStorage,
  writeNewHistoryEntry,
} from "./localstorage";
import { FaCog } from "react-icons/fa";
import { SETTINGS_MODAL_ID, SettingsModal } from "./SettingsModal";

export default function Home() {
  const [currentBudget, setCurrentBudget] = useState<number | undefined>();

  useEffect(() => {
    const { currentBudget } = readFromLocalStorage();
    setCurrentBudget(currentBudget);
  }, []);

  const handleCurrentBudgetChange = (value: number) => {
    writeNewHistoryEntry(value);
    setCurrentBudget(value);
    localStorage.setItem(LocalStorageKey.CURRENT_BUDGET, value.toString());
  };

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <h1 className="text-3xl text-center uppercase tracking-tighter py-4">
        Daily spending limit
      </h1>
      <div className="mt-4 flex flex-col items-center space-y-2">
        <Input
          label="Current budget"
          value={currentBudget ?? 0}
          setValue={handleCurrentBudgetChange}
        />
        <button
          className="p-2 rounded-lg w-full border-gray-300 text-gray-900 shadow"
          // @ts-ignore
          popovertarget={SETTINGS_MODAL_ID}
        >
          Settings
        </button>
      </div>

      {currentBudget && <Chart current={currentBudget} />}
      <SettingsModal />
    </main>
  );
}
