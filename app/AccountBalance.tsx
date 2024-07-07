import { FaQuestionCircle, FaCog } from "react-icons/fa";
import Input from "./Input";
import { getExplanationModalId, ConceptType, ModalType } from "./modal/Modals";
import { OpenModalButton } from "./OpenModalButton";
import { useLocalstorageValues } from "./hooks/useLocalstorageValues";

export const AccountBalance = () => {
  const { currentBudget, setBalance } = useLocalstorageValues();

  const openSettingsButtonProps = {
    popovertarget: ModalType.SETTING,
  };

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
          <button {...openSettingsButtonProps}>
            <FaCog />
          </button>
        </div>
      </div>
      <Input value={currentBudget ?? 0} setValue={setBalance} />
    </div>
  );
};
