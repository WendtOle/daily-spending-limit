import { FaQuestionCircle } from "react-icons/fa";
import { getExplanationModalId, ConceptType } from "./modal/Modals";
import { OpenModalButton } from "./OpenModalButton";
import { useLocalstorageValues } from "./hooks/useLocalstorageValues";
import CalculationInput from "./components/CalculationInput";

export const AccountBalance = () => {
  const { currentBudget, setBalance } = useLocalstorageValues();


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
