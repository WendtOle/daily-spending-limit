import { FaQuestionCircle, FaCog, FaCheck } from "react-icons/fa";
import { FaSquareCheck, FaSquare } from "react-icons/fa6";
import { getExplanationModalId, ConceptType, ModalType } from "./modal/Modals";
import { OpenModalButton } from "./OpenModalButton";
import { clearPendingEntry } from "./pendingUtils";
import { useLocalstorageValues } from "./hooks/useLocalstorageValues";

export const PendingFixedCosts = () => {
  const { pendingEntries } = useLocalstorageValues();

  const adjustFixedCostsButtonProps = {
    popovertarget: ModalType.FIXED_COSTS,
  };

  const handleClearEntry = (entryId: string) => {
    clearPendingEntry(entryId);
  };

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
      <div className="w-full max-h-32 overflow-y-scroll overflow-x-hidden flex items-center flex-col space-y-2 mt-4 pb-2">
        {pendingEntries
          .filter(({ isPayed }) => !isPayed)
          .map((entry) => {
            const inactive = entry.isPayed;
            return (
              <button
                key={entry.id}
                className={`flex flex-row justify-between w-full mr-4 ${
                  inactive ? "text-slate-300" : ""
                }`}
                onClick={() => handleClearEntry(entry.id)}
              >
                <div className="flex flex-row items-center justify-between pl-8 pr-4 py-3 w-full bg-white rounded-lg shadow mr-2 ml-6">
                  <p className="">
                    {entry.value}€ - {entry.label}
                  </p>
                  <FaCheck />
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};
