"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import { getDate } from "./getDate";
import Results from "./Results";
import Chart from "./Chart";
import {
  LocalStorageKey,
  readFromLocalStorage,
  writeNewHistoryEntry,
} from "./localstorage";
import { History } from "./types";
import { FaCog } from "react-icons/fa";

export default function Home() {
  const [startBudget, setStartBudget] = useState<number | undefined>();
  const [currentBudget, setCurrentBudget] = useState<number | undefined>();
  const [budgetOffset, setBudgetOffset] = useState<number | undefined>();
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [history, setHistory] = useState<History>({});

  useEffect(() => {
    const { currentBudget, startBudget, budgetOffset, history } =
      readFromLocalStorage();
    setStartBudget(startBudget);
    setCurrentBudget(currentBudget);
    setBudgetOffset(budgetOffset);
    setHistory(history);
  }, []);

  const handleStartBudgetChange = (value: number) => {
    setStartBudget(value);
    localStorage.setItem(LocalStorageKey.START_BUDGET, value.toString());
  };
  const handleBudgetOffsetChange = (value: number) => {
    setBudgetOffset(value);
    localStorage.setItem(LocalStorageKey.BUDGET_OFFSET, value.toString());
  };

  const handleCurrentBudgetChange = (value: number) => {
    const updatedHistory = writeNewHistoryEntry(value);
    setHistory(updatedHistory);
    setCurrentBudget(value);
    localStorage.setItem(LocalStorageKey.CURRENT_BUDGET, value.toString());
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 relative">
      <div className="absolute right-0 top-0 m-2 sm:m-4">
        <FaCog fontSize={20} />
      </div>
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
        {showAdvanced && (
          <>
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
          </>
        )}
        <button
          type="button"
          className="w-full mt-4 p-1 rounded-lg text-sm px-5 border border-gray-300 disabled:border-gray-100 disabled:text-gray-200 text-base"
          onClick={() => setShowAdvanced((cur) => !cur)}
        >
          {showAdvanced ? "Hide advanced" : "Show advanced"}
        </button>
      </div>

      <Results
        currentBudget={currentBudget ?? 0}
        startBudget={startBudget}
        budgetOffset={budgetOffset ?? 0}
      />
      {currentBudget && (
        <Chart
          start={startBudget}
          offset={budgetOffset}
          current={currentBudget}
          history={history[new Date().getMonth()]}
        />
      )}
    </main>
  );
}
