import { FaQuestionCircle } from "react-icons/fa";
import Input from "../Input";
import { Modal } from "../Modal";
import { OpenModalButton } from "../OpenModalButton";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";

export const SettingsModal = () => {
  const {
    offset,
    setOffset,
    startBudget,
    setStartBudget,
    thirdMonthMode,
    setThirdMonthMode,
  } = useLocalstorageValues();

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
      <div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <input
              className="w-6 h-6"
              type="checkbox"
              checked={thirdMonthMode}
              onChange={(e) => setThirdMonthMode(e.target.checked)}
            />
            <label className="font-medium text-gray-900 ml-2">Focus mode</label>
          </div>
          <OpenModalButton id={getExplanationModalId(ConceptType.FOCUS_MODE)}>
            <FaQuestionCircle />
          </OpenModalButton>
        </div>
      </div>
    </Modal>
  );
};
