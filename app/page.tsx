"use client";
import { useState } from "react";
import Input from "./Input";
import { getDate } from "./getDate";
import Results from "./Results";

export default function Home() {
  const [startBudget, setStartBudget] = useState<number>(1200);
  const [currentBudget, setCurrentBudget] = useState<number | undefined>(1005);
  const [budgetOffset, setBudgetOffset] = useState<number>(500);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-3xl text-center">Daily spending limit (DSL)</h1>
      <h2 className="text-2xl mt-2">{getDate()}</h2>
      <div className="mt-4">
        <Input
          label="Budget"
          value={currentBudget ?? 0}
          setValue={setCurrentBudget}
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
              setValue={setBudgetOffset}
            />
            <Input
              label="Start budget"
              value={startBudget}
              setValue={setStartBudget}
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
