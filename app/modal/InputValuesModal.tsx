import Input from "../Input";
import { clearPendingEntry, deletePendingEntry } from "../pendingUtils";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";
import { Modal } from "../Modal";
import {
  FaRotateRight,
  FaSquareCheck,
  FaToggleOn,
  FaTrash,
} from "react-icons/fa6";
import { OpenModalButton } from "../OpenModalButton";
import { FaQuestionCircle, FaSquare, FaToggleOff } from "react-icons/fa";

export const InputValuesModal = () => {
  const {
    currentBudget,
    setBalance,
    pendingEntries: fixedCostsEntries,
  } = useLocalstorageValues();

  const addPendingEntryButtonProps = {
    popovertarget: ModalType.FIXED_COST_ENTRY,
  };

  return (
    <Modal fullScreen modalId={ModalType.INPUT_VALUES}>
      <h1 className="text-xl text-center uppercase">Parameters</h1>
      <div className="flex flex-row justify-between">
        <p>Account balance</p>
        <OpenModalButton
          id={getExplanationModalId(ConceptType.ACCOUNT_BALANCE)}
        >
          <FaQuestionCircle />
        </OpenModalButton>
      </div>
      <Input value={currentBudget ?? 0} setValue={setBalance} />
      <div className="flex flex-row justify-between">
        <p>Fixed costs</p>
        <OpenModalButton id={getExplanationModalId(ConceptType.FIXED_COSTS)}>
          <FaQuestionCircle />
        </OpenModalButton>
      </div>
      {fixedCostsEntries.length > 0 ? (
        <div className="flex flex-row items-center w-full italic text-sm">
          <p className="ml-16">Amount</p>
          <p className="ml-6">Name</p>
        </div>
      ) : (
        <></>
      )}
      <div className="w-full max-h-60 overflow-y-scroll overflow-x-hidden flex items-center flex-col space-y-2 text-sm">
        {fixedCostsEntries.map((entry) => {
          const inactive = entry.isPayed;
          return (
            <div
              key={entry.id}
              className={`flex flex-row justify-between border-b-2 border-b-slate-100 w-full mr-4 ${
                inactive ? "text-slate-300" : ""
              }`}
            >
              <div className="flex flex-row items-center px-2 py-1 w-full">
                <button
                  onClick={() => clearPendingEntry(entry.id)}
                  className="mx-2"
                >
                  {inactive ? (
                    <FaSquareCheck className="text-slate-600" />
                  ) : (
                    <FaSquare className="text-slate-600" />
                  )}
                </button>
                <p className="w-10 ml-8">{entry.value}€ </p>
                <p className="w-24 ml-2 overflow-hidden text-center">
                  {entry.label}
                </p>
              </div>

              <button onClick={() => deletePendingEntry(entry.id)} className="">
                <FaTrash className="text-slate-600" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-row justify-center">
        <button
          {...addPendingEntryButtonProps}
          className="rounded shadow px-4 py-2 w-full shadow mb-2 uppercase"
        >
          Add fixed cost entry
        </button>
      </div>
    </Modal>
  );
};
