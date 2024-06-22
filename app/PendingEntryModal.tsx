import { useState } from "react";
import Input from "./Input";
import { addPendingEntry } from "./localstorage";

export const PENDING_ENTRY_MODAL_ID = "pending-entry-modal-id";

export const PendingEntryModal = () => {
  const [value, setValue] = useState(0);
  const [clearingDay, setClearingDay] = useState(1);
  const [repeatsEveryMonth, setRepeatsEveryMonth] = useState(false);

  const handleSave = () => {
    // @ts-ignore
    document.getElementById(PENDING_ENTRY_MODAL_ID)?.hidePopover();
    addPendingEntry({
      value,
      clearingDay,
      repeatsEveryMonth,
      id: crypto.randomUUID(),
    });
  };

  return (
    <div
      className="p-8 py-6 shadow-xl modal rounded space-y-2"
      id={PENDING_ENTRY_MODAL_ID}
      // @ts-ignore
      popover="auto"
    >
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Add pending entry
      </h1>
      <Input label="Amount" value={value} setValue={setValue} />
      <p>Clearing day</p>
      <select
        className="w-full"
        value={clearingDay}
        onChange={(e) => setClearingDay(parseInt(e.target.value))}
      >
        {[...Array.from(Array(31).keys())].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <div className="flex flex-row space-x-4">
        <input
          type="checkbox"
          checked={repeatsEveryMonth ?? false}
          onChange={() => setRepeatsEveryMonth(!repeatsEveryMonth)}
        />
        <p>Repeats every month</p>
      </div>
      <button
        className="rounded shadow px-4 py-2 w-full uppercase"
        onClick={handleSave}
      >
        Add entry
      </button>
    </div>
  );
};
