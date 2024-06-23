import { useState } from "react";
import Input from "../Input";
import { addPendingEntry } from "../localstorage";
import { Modal } from "../Modal";
import { ModalType } from "./Modals";

export const PendingEntryModal = () => {
  const [value, setValue] = useState(0);
  const [clearingDay, setClearingDay] = useState(1);
  const [repeatsEveryMonth, setRepeatsEveryMonth] = useState(false);
  const [label, setLabel] = useState<string>("");

  const handleSave = () => {
    // @ts-ignore
    document.getElementById(ModalType.PENDING_ENTRY)?.hidePopover();
    addPendingEntry({
      value,
      clearingDay,
      repeatsEveryMonth,
      id: crypto.randomUUID(),
      label,
    });
  };

  return (
    <Modal modalId={ModalType.PENDING_ENTRY}>
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Add pending entry
      </h1>
      <label htmlFor="label" className="block font-small text-gray-900">
        Label
      </label>
      <input
        id="label"
        className="text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-8 text-base shadow"
        type="text"
        value={label}
        maxLength={12}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter entry label ..."
      />
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
    </Modal>
  );
};
