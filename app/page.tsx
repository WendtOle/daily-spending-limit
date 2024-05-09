"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import { getDate } from "./getDate";
import Results from "./Results";

export default function Home() {
  const [startBudget, setStartBudget] = useState<number | undefined>();
  const [currentBudget, setCurrentBudget] = useState<number | undefined>();
  const [budgetOffset, setBudgetOffset] = useState<number | undefined>();
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  useEffect(() => {
    const localStorageCurrentBudget = localStorage.getItem("currentBudget");
    if (localStorageCurrentBudget) {
      setCurrentBudget(+localStorageCurrentBudget);
    }
    const localStorageStartBudget = localStorage.getItem("startBudget");
    if (localStorageStartBudget) {
      setStartBudget(+localStorageStartBudget);
    }
    const localStorageBudgetOffset = localStorage.getItem("budgetOffset");
    if (localStorageBudgetOffset) {
      setBudgetOffset(+localStorageBudgetOffset);
    }
  }, []);

  const handleStartBudgetChange = (value: number) => {
    setStartBudget(value);
    localStorage.setItem("startBudget", value.toString());
  };
  const handleBudgetOffsetChange = (value: number) => {
    setBudgetOffset(value);
    localStorage.setItem("budgetOffset", value.toString());
  };

  const handleCurrentBudgetChange = (value: number) => {
    const rawHistory = localStorage.getItem("history");
    const history: Record<string, number> = JSON.parse(rawHistory ?? "{}");
    localStorage.setItem(
      "history",
      JSON.stringify({ ...history, [getDate()]: currentBudget })
    );
    setCurrentBudget(value);
    localStorage.setItem("currentBudget", value.toString());
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
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
    </main>
  );
}
