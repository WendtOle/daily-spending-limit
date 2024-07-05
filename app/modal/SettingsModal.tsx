import { FaQuestionCircle } from "react-icons/fa";
import Input from "../Input";
import { Modal } from "../Modal";
import { OpenModalButton } from "../OpenModalButton";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";

export const SettingsModal = () => {
  const { offset, setOffset, startBudget, setStartBudget } =
    useLocalstorageValues();

  return (
    <Modal modalId={ModalType.SETTING} fullScreen>
      <h1 className="text-xl text-center uppercase">Settings</h1>
      <div className="flex flex-row justify-between">
        <p>Start budget</p>
        <OpenModalButton id={getExplanationModalId(ConceptType.START_BUDGET)}>
          <FaQuestionCircle />
        </OpenModalButton>
      </div>
      <Input value={startBudget ?? 0} setValue={setStartBudget} />
      <div className="flex flex-row justify-between">
        <p>Budget offset</p>
        <OpenModalButton id={getExplanationModalId(ConceptType.PUFFER)}>
          <FaQuestionCircle />
        </OpenModalButton>
      </div>
      <Input value={offset} setValue={setOffset} />
    </Modal>
  );
};
