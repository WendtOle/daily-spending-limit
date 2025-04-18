import { FaQuestionCircle } from "react-icons/fa";
import Input from "../components/Input";
import { Modal } from "../Modal";
import { OpenModalButton } from "../OpenModalButton";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";

export const SettingsModal = () => {    
  const { allowPendingEntries, setAllowPendingEntries } = useLocalstorageValues();
  const { offset, setOffset, startBudget, setStartBudget } =
    useLocalstorageValues();

  const onToggle = () => {
    setAllowPendingEntries(!allowPendingEntries)
  };

  return (
    <Modal modalId={ModalType.SETTING} fullScreen>
      <h1 className="text-xl text-center uppercase">Settings</h1>
      <div className="flex flex-row justify-between">
        <p>Spending budget</p>
        <OpenModalButton
          id={getExplanationModalId(ConceptType.SPENDING_BUDGET)}
        >
          <FaQuestionCircle />
        </OpenModalButton>
      </div>
      <Input value={startBudget ?? 0} setValue={setStartBudget} />
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-medium text-gray-900">Advanced mode</h4>
          <p className="text-sm text-gray-500">Register recurring expenses and buffer</p>
        </div>
        <button 
          onClick={onToggle}
          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
            allowPendingEntries ? 'bg-green-500' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={allowPendingEntries}
        >
          <span 
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              allowPendingEntries ? 'translate-x-5' : 'translate-x-0'
            }`} 
          />
        </button>
        </div>
        <div>
        {allowPendingEntries &&
        <>
          <div className="flex flex-row justify-between">
            <p>Budget offset</p>
            <OpenModalButton id={getExplanationModalId(ConceptType.PUFFER)}>
              <FaQuestionCircle />
            </OpenModalButton>
          </div>
          <Input value={offset} setValue={setOffset} />
          </>}
        </div>
    </Modal>
  );
};
