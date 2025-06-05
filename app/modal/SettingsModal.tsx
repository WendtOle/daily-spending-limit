import { FaQuestionCircle } from "react-icons/fa";
import Input from "../components/Input";
import { Modal } from "../Modal";
import { OpenModalButton } from "../OpenModalButton";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";
import { useBudgetStore, useBudgetsStore } from "../budgetStore";
import { useSettingsStore } from "../stores/settings";

export const SettingsModal = () => {
  const addSeparateBudget = useBudgetsStore(state => state.addBudget)
  const isAdvancedModeEnabled = useSettingsStore(state => state.isAdvancedModeEnabled);
  const toggleAdvacedMode = useSettingsStore(state => state.toggleAdvancedMode)
  const { startBudget, budgetOffset: offset } = useBudgetStore()
  const setBudgetById = useBudgetsStore(state => state.setBudget)

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
      <Input value={startBudget} setValue={(newValue: number) => setBudgetById({ startBudget: newValue })} />
      <div className="flex flex-col space-y-2">
        <h4 className="text-base font-medium text-gray-900">Budgets</h4>
        <button
          onClick={addSeparateBudget}
          className="rounded-xl shadow px-4 py-2 uppercase"
          aria-checked={isAdvancedModeEnabled}
        >
          Create separate budget
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-medium text-gray-900">Advanced mode</h4>
          <p className="text-sm text-gray-500">Register recurring expenses and buffer</p>
        </div>
        <button
          onClick={toggleAdvacedMode}
          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${isAdvancedModeEnabled ? 'bg-green-500' : 'bg-gray-200'
            }`}
          role="switch"
          aria-checked={isAdvancedModeEnabled}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isAdvancedModeEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      <div>
        {isAdvancedModeEnabled &&
          <>
            <div className="flex flex-row justify-between">
              <p>Budget offset</p>
              <OpenModalButton id={getExplanationModalId(ConceptType.PUFFER)}>
                <FaQuestionCircle />
              </OpenModalButton>
            </div>
            <Input value={offset ?? null} setValue={(newValue: number) => setBudgetById({ offset: newValue })} />
          </>}
      </div>
    </Modal>
  );
};
