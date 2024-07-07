import Input from "../Input";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";
import { Modal } from "../Modal";
import { OpenModalButton } from "../OpenModalButton";
import { FaQuestionCircle } from "react-icons/fa";

export const InputValuesModal = () => {
  const { currentBudget, setBalance } = useLocalstorageValues();

  return (
    <Modal fullScreen modalId={ModalType.INPUT_VALUES}>
      <h1 className="text-xl text-center uppercase">Account balance</h1>
      <div className="flex flex-row-reverse">
        <OpenModalButton
          id={getExplanationModalId(ConceptType.ACCOUNT_BALANCE)}
        >
          <FaQuestionCircle />
        </OpenModalButton>
      </div>
      <Input value={currentBudget ?? 0} setValue={setBalance} />
    </Modal>
  );
};
