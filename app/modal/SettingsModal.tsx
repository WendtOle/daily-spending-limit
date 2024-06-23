import Input from "../Input";
import { Modal } from "../Modal";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { ModalType } from "./Modals";

export const SettingsModal = () => {
  const {
    offset,
    setOffset,
    startBudget,
    setStartBudget,
    thirdMonthMode,
    setThirdMonthMode,
  } = useLocalstorageValues();

  return (
    <Modal modalId={ModalType.SETTING} fullScreen>
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Settings
      </h1>
      <Input
        label="Start budget"
        value={startBudget ?? 0}
        setValue={setStartBudget}
      />
      <Input label="Budget offset" value={offset} setValue={setOffset} />
      <div>
        <div className="flex flex-row items-center">
          <input
            className="w-6 h-6"
            type="checkbox"
            checked={thirdMonthMode}
            onChange={(e) => setThirdMonthMode(e.target.checked)}
          />
          <label className="font-medium text-gray-900 ml-2">Focus mode</label>
        </div>
        <div className="w-full text-sm mt-2 ml-4">
          The focus mode helps to gain control over your daily spending by
          reducing the observed time period to 10 days. <br /> Obviously you
          should adjust the value for <i>budget offset</i> and{" "}
          <i>start budget</i> accordingly.
        </div>
      </div>
    </Modal>
  );
};
