import Input from "../Input";
import { PENDING_ENTRY_MODAL_ID } from "./PendingEntryModal";
import { SETTINGS_MODAL_ID } from "./SettingsModal";
import { deletePendingEntry } from "../localstorage";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { Modal } from "../Modal";
export const INPUT_VALUES_MODAL = "input-values-modal-id";

export const InputValuesModal = () => {
  const { currentBudget, setBalance, pendingEntries, pendingTotal } =
    useLocalstorageValues();

  const dissmissButtonProps = {
    popovertarget: INPUT_VALUES_MODAL,
    popovertargetaction: "hide",
  };

  const openSettingsButtonProps = {
    popovertarget: SETTINGS_MODAL_ID,
  };

  const addPendingEntryButtonProps = {
    popovertarget: PENDING_ENTRY_MODAL_ID,
  };

  return (
    <Modal modalId={INPUT_VALUES_MODAL}>
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Input values
      </h1>
      <Input
        label="Account balance"
        value={currentBudget ?? 0}
        setValue={setBalance}
      />

      <div className="w-full">
        {pendingEntries
          .sort((a, b) => (a.clearingDay < b.clearingDay ? -1 : 1))
          .map((entry) => (
            <div
              key={entry.id}
              className="flex flex-row justify-between space-x-2"
            >
              <p>
                {entry.value}€ clears on the {entry.clearingDay}.{" "}
                {entry.repeatsEveryMonth ? "every month" : ""}
              </p>
              <button
                onClick={() => deletePendingEntry(entry.id)}
                className="p-1 shadow"
              >
                X
              </button>
            </div>
          ))}
        <p className="border-t-2">{pendingTotal}€ total</p>
      </div>
      <button
        {...addPendingEntryButtonProps}
        className="rounded shadow px-4 py-2 w-full uppercase"
      >
        Add pending entry
      </button>
      <div className="flex justify-center space-x-2">
        <button
          className=" px-4 py-2 rounded shadow uppercase text-md"
          {...openSettingsButtonProps}
        >
          Open settings
        </button>
        <button
          className=" px-4 py-2 rounded shadow uppercase text-md"
          {...dissmissButtonProps}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
