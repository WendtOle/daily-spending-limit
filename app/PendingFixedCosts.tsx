import {
  FaQuestionCircle,
  FaCog,
  FaRegCheckCircle as FaCheckCircle,
} from "react-icons/fa";
import { getExplanationModalId, ConceptType, ModalType } from "./modal/Modals";
import { OpenModalButton } from "./OpenModalButton";
import { useBudgetStore } from "./budgetStore";

export const PendingFixedCosts = () => {
  const { pendingEntries: allEntries, togglePendingEntry } = useBudgetStore();

  const adjustFixedCostsButtonProps = {
    popoverTarget: ModalType.FIXED_COSTS,
  };

  const pendingEntries = allEntries.filter(({ isPayed }) => !isPayed);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <p>Pending fixed costs</p>
        <div className="flex flex-row space-x-2">
          <OpenModalButton id={getExplanationModalId(ConceptType.FIXED_COSTS)}>
            <FaQuestionCircle />
          </OpenModalButton>
          <button {...adjustFixedCostsButtonProps}>
            <FaCog />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-wrap mt-2">
        {pendingEntries.map((entry) => {
          return (
            <div key={entry.id} className={`flex flex-row justify-between`}>
              <div className="flex flex-row items-center justify-between pl-4 pr-2 py-2 w-full bg-white rounded-full shadow text-xs inline-block">
                <p className="mr-1 uppercase">
                  {entry.label} {entry.value}€
                </p>
                <button onClick={() => togglePendingEntry(entry.id)}>
                  <FaCheckCircle
                    fontSize={16}
                    className="ml-1 text-slate-600"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
