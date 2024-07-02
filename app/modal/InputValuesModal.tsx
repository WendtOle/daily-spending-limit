import Input from "../Input";
import { clearPendingEntry, deletePendingEntry } from "../pendingUtils";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";
import { Modal } from "../Modal";
import { FaCheck, FaRotateRight, FaTrash } from "react-icons/fa6";
import { OpenModalButton } from "../OpenModalButton";
import { FaQuestionCircle } from "react-icons/fa";

export const InputValuesModal = () => {
  const { currentBudget, setBalance, pendingEntries, pendingTotal } =
    useLocalstorageValues();

  const addPendingEntryButtonProps = {
    popovertarget: ModalType.PENDING_ENTRY,
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
        <p>Pending expenses</p>
        <OpenModalButton
          id={getExplanationModalId(ConceptType.PENDING_EXPENSE)}
        >
          <FaQuestionCircle />
        </OpenModalButton>
      </div>
      <div className="flex flex-row items-center w-full italic text-sm">
        <p>Date</p>
        <p className="ml-6">Amount</p>
        <p className="ml-6">Name</p>
        <p className="ml-6">Recurring</p>
      </div>
      <div className="w-full max-h-60 overflow-y-scroll overflow-x-hidden flex items-center flex-col space-y-2 text-sm">
        {pendingEntries
          .sort((a, b) => (a.clearingDay < b.clearingDay ? -1 : 1))
          .map((entry) => {
            const inactive =
              entry.isCleared || entry.clearingDay <= new Date().getDate();
            return (
              <div
                key={entry.id}
                className={`flex flex-row justify-between space-x-1 border-b-2 border-b-slate-100 w-full mr-4 ${
                  inactive ? "text-slate-300" : ""
                }`}
              >
                <div className="flex flex-row items-center px-2 py-1 w-full">
                  <p className="w-6 ml-2">
                    {entry.clearingDay}.{new Date().getMonth() + 1}{" "}
                  </p>
                  <p className="w-10 ml-8">{entry.value}€ </p>
                  <p className="w-24 ml-2 overflow-hidden text-center">
                    {entry.label}
                  </p>
                  <div className="w-4 ml-4">
                    {entry.repeatsEveryMonth && <FaRotateRight />}
                  </div>
                </div>
                <button
                  onClick={() => clearPendingEntry(entry.id)}
                  className=""
                >
                  <FaCheck className="text-slate-600" />
                </button>
                <button
                  onClick={() => deletePendingEntry(entry.id)}
                  className=""
                >
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
          Add pending entry
        </button>
      </div>
    </Modal>
  );
};
