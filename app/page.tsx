"use client";
import React from "react";
import { ArcChart } from "./components/ArcChart";
import { getPeriod } from "./calculations";
import { useBudgetStore, useBudgetsStore } from "./budgetStore";
import { AccountBalance } from "./AccountBalance";
import { OpenModalButton } from "./OpenModalButton";
import { FaQuestionCircle } from "react-icons/fa";
import { ConceptType, getExplanationModalId } from "./modal/Modals";
import Input from "./components/Input";

export default function Home() {
  const { left, length } = getPeriod(new Date())
  const { startBudget } = useBudgetStore()
  const budgets = useBudgetsStore(state => state.budgets)
  const setBudgetById = useBudgetsStore(state => state.setBudget)
  const selectBudget = useBudgetsStore(state => state.selectBudget)

  const values = Object.entries(budgets).map(([id, { currentBudget, startBudget }]) => {
    if (currentBudget === undefined || startBudget === undefined) {
      return { id, value: 0 }
    }
    if (currentBudget > startBudget) {
      return { id, value: 0 }
    }
    return ({ id, value: currentBudget / startBudget })
  })
  return (
    <main className="flex flex-col justify-around items-center h-screen">
      <div className="w-64">
        <ArcChart values={values} reference={left / length} onReferenceClick={() => console.log("reference clicked")} onValueClick={selectBudget} />
      </div>
      <div className="flex flex-col gap-4 w-64">
        <AccountBalance />
        <div>
          <div className="flex flex-row justify-between">
            <p>Spending budget</p>
            <OpenModalButton
              id={getExplanationModalId(ConceptType.SPENDING_BUDGET)}
            >
              <FaQuestionCircle />
            </OpenModalButton>
          </div>
          <Input value={startBudget} setValue={(newValue: number) => setBudgetById({ startBudget: newValue })} />
        </div>
      </div>
    </main>
  );
}
