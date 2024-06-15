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
    <main className="flex min-h-screen flex-col items-center p-12 relative">
      <button
        // @ts-ignore
        popovertarget={SETTINGS_MODAL_ID}
        className="absolute right-0 top-0 m-2 sm:m-4"
      >
        <FaCog fontSize={20} />
      </button>
      <SettingsModal />
      <h1 className="text-3xl text-center uppercase tracking-tighter">
        Daily spending limit (DSL)
      </h1>
      <h2 className="text-2xl mt-2">{getDate()}</h2>
      <div className="mt-4">
        <Input
          label="Current budget"
          value={currentBudget ?? 0}
          setValue={handleCurrentBudgetChange}
        />
      </div>
      {currentBudget && <Chart current={currentBudget} />}
    </main>
  );
}
