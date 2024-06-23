import Input from "../Input";
import { deletePendingEntry } from "../localstorage";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ConceptType, ModalType, getExplanationModalId } from "./Modals";
import { Modal } from "../Modal";
import { FaTrash } from "react-icons/fa6";
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
      <div className="w-full max-h-96 overflow-auto flex items-center flex-col space-y-1">
        {pendingEntries
          .sort((a, b) => (a.clearingDay < b.clearingDay ? -1 : 1))
          .map((entry) => (
            <div
              key={entry.id}
              className="flex flex-row justify-between space-x-1 py-1 max-w-96"
            >
              <div className="flex flex-row bg-slate-100 space-x-1 px-4 py-1 w-60">
                <p>{entry.value}€ </p>
                <p>on the {entry.clearingDay}. </p>
                <p>{entry.repeatsEveryMonth ? "every month" : ""}</p>
              </div>
              <button onClick={() => deletePendingEntry(entry.id)} className="">
                <FaTrash className="text-slate-600" />
              </button>
            </div>
          ))}
        <div className="m-2">
          <button
            {...addPendingEntryButtonProps}
            className="rounded-full shadow px-4 py-1 w-full shadow w-48 mb-2"
          >
            Add pending entry
          </button>
        </div>
      </div>
    </Modal>
  );
};
