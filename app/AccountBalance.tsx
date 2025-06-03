import { FaQuestionCircle } from "react-icons/fa";
import { getExplanationModalId, ConceptType } from "./modal/Modals";
import { OpenModalButton } from "./OpenModalButton";
import CalculationInput from "./components/CalculationInput";
import { useBudgetStore, useBudgetsStore } from "./budgetStore";

export const AccountBalance = () => {
  const { currentBudget } = useBudgetStore()
  const setBudget = useBudgetsStore(state => state.setBudget)
  const setBalance = (newBalance: number) => setBudget({ currentBudget: newBalance })


  return (
    <div>
      <div className="flex flex-row justify-between">
        <p>Account balance</p>
        <div className="flex flex-row space-x-2">
          <OpenModalButton
            id={getExplanationModalId(ConceptType.ACCOUNT_BALANCE)}
          >
            <FaQuestionCircle />
          </OpenModalButton>
        </div>
      </div>
      <CalculationInput value={currentBudget} setValue={setBalance} />
    </div>
  );
};
