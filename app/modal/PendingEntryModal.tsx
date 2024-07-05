import { useState } from "react";
import Input from "../Input";
import { addPendingEntry } from "../pendingUtils";
import { Modal } from "../Modal";
import { ModalType } from "./Modals";

export const PendingEntryModal = () => {
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState<string>("");

  const handleSave = () => {
    // @ts-ignore
    document.getElementById(ModalType.FIXED_COST_ENTRY)?.hidePopover();
    addPendingEntry({
      value,
      id: crypto.randomUUID(),
      label,
      isPayed: false,
    });
  };

  return (
    <Modal modalId={ModalType.FIXED_COST_ENTRY}>
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Add fixed costs entry
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
      <button
        className="rounded shadow px-4 py-2 w-full uppercase"
        onClick={handleSave}
      >
        Add entry
      </button>
    </Modal>
  );
};
