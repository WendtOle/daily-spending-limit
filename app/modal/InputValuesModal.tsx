import Input from "../Input";
import { deletePendingEntry } from "../localstorage";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";
import { Modal } from "../Modal";
import { FaRotateRight, FaTrash } from "react-icons/fa6";
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
      <div className="w-full max-h-60 overflow-auto flex items-center flex-col space-y-2">
        <div className="flex flex-row space-x-8 items-center w-60">
          <p>Date</p>
          <p>Amount</p>
          <p>Recurring</p>
        </div>
        {pendingEntries
          .sort((a, b) => (a.clearingDay < b.clearingDay ? -1 : 1))
          .map((entry) => {
            const inactive = entry.clearingDay <= new Date().getDate();
            return (
              <div
                key={entry.id}
                className={`flex flex-row justify-between space-x-1 max-w-96 border-b-2 ${
                  inactive ? "text-slate-300" : ""
                }`}
              >
                <div className="flex flex-row space-x-16 items-center px-4 py-1 w-60">
                  <p>
                    {entry.clearingDay}.{new Date().getMonth() + 1}{" "}
                  </p>
                  <p>{entry.value}€ </p>

                  {entry.repeatsEveryMonth && <FaRotateRight />}
                </div>
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
