"use client";
import { useState } from "react";
import Input from "./Input";
import { getDate } from "./getDate";
import Results from "./Results";

export default function Home() {
  const [startBudget, setStartBudget] = useState<number>(
    +(localStorage.getItem("startBudget") || 0)
  );

  const localStorageCurrentBudget = localStorage.getItem("currentBudget");
  const [currentBudget, setCurrentBudget] = useState<number | undefined>(
    localStorageCurrentBudget ? +localStorageCurrentBudget : undefined
  );
  const [budgetOffset, setBudgetOffset] = useState<number>(
    +(localStorage.getItem("budgetOffset") || 0)
  );
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleStartBudgetChange = (value: number) => {
    setStartBudget(value);
    localStorage.setItem("startBudget", value.toString());
  };
  const handleCurrentBudgetChange = (value: number) => {
    setCurrentBudget(value);
    localStorage.setItem("currentBudget", value.toString());
  };
  const handleBudgetOffsetChange = (value: number) => {
    setBudgetOffset(value);
    localStorage.setItem("budgetOffset", value.toString());
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-3xl text-center">Daily spending limit (DSL)</h1>
      <h2 className="text-2xl mt-2">{getDate()}</h2>
      <div className="mt-4">
        <Input
          label="Budget"
          value={currentBudget ?? 0}
          setValue={handleCurrentBudgetChange}
        />
        <div className="flex items-center w-full m-2">
          <button
            type="button"
            className="rounded-lg text-sm px-5 border border-gray-300 disabled:border-gray-100 disabled:text-gray-200"
            onClick={() => setShowAdvanced((cur) => !cur)}
          >
            {showAdvanced ? "Hide advanced" : "Advanced"}
          </button>
        </div>
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
      </div>

      <Results
        currentBudget={currentBudget ?? 0}
        startBudget={startBudget}
        budgetOffset={budgetOffset}
      />
    </main>
  );
}
