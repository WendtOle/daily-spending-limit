"use client";
import React from "react";
import { ArcChart } from "./components/ArcChart";
import { getPeriod } from "./calculations";
import { useBudgetStore, useBudgetsStore } from "./budgetStore";
import { AccountBalance } from "./AccountBalance";
import { OpenModalButton } from "./OpenModalButton";
import { FaMinusCircle, FaPlusCircle, FaQuestionCircle } from "react-icons/fa";
import { ConceptType, getExplanationModalId } from "./modal/Modals";
import Input from "./components/Input";
import { useDSL } from "./hooks/useDSL";

export default function Home() {
  const { left, length } = getPeriod(new Date())
  const { startBudget, currentBudget, budgetOffset, pendingFixedCosts } = useBudgetStore()
  const budgets = useBudgetsStore(state => state.budgets)
  const setBudgetById = useBudgetsStore(state => state.setBudget)
  const selectBudget = useBudgetsStore(state => state.selectBudget)
  const selectedBudgetId = useBudgetsStore(state => state.currBudgetId)
  const addBudget = useBudgetsStore(state => state.addBudget)
  const removeBudget = useBudgetsStore(state => state.removeBudget)

  const { youShouldTargetDSL } = useDSL({
    startBudget: startBudget ?? 0,
    currentBudget: currentBudget ?? 0,
    offset: budgetOffset ?? 0,
    futureExpenses: pendingFixedCosts ?? 0,
    today: new Date(),
  });

  const values = Object.entries(budgets).map(([id, { currentBudget, startBudget, name: title }]) => {
    if (currentBudget === undefined || startBudget === undefined) {
      return { id, value: 0, title }
    }
    if (currentBudget > startBudget) {
      return { id, value: 0, title }
    }
    return ({ id, value: currentBudget / startBudget, title })
  })
  const canDelete = Object.keys(budgets).length > 1

  return (
    <main className="flex flex-col justify-around items-center h-dvh">
      <div className="w-80 relative">
        <ArcChart values={values} reference={left / length} onReferenceClick={() => console.log("reference clicked")} onValueClick={selectBudget} highlighted={selectedBudgetId} innerTitle={`${youShouldTargetDSL}€/d`} referenceTitle={`${left} days left`} />
        <button
          onClick={addBudget}
          className="absolute right-5 bottom-6"
        >
          <FaPlusCircle size={36} className="text-slate-400" />
        </button>
        {canDelete && <button
          onClick={() => removeBudget(selectedBudgetId)}
          className="absolute left-5 bottom-6"
        >
          <FaMinusCircle size={36} className="text-slate-400" />
        </button>}
      </div>
      <div>
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
