import Input from "./Input";
import { useLocalstorageValues } from "./useLocalstorageValues";
export const SETTINGS_MODAL_ID = "settings-modal-id";

export const SettingsModal = () => {
  const {
    currentBudget,
    setBalance,
    offset,
    setOffset,
    startBudget,
    setStartBudget,
    thirdMonthMode,
    setThirdMonthMode,
    futureExpenses,
    setFutureExpenses,
  } = useLocalstorageValues();

  return (
    <div
      className="p-8 pt-6 shadow-xl modal rounded space-y-6"
      id={SETTINGS_MODAL_ID}
      // @ts-ignore
      popover="auto"
    >
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Settings
      </h1>
      <Input
        label="Account balance"
        value={currentBudget ?? 0}
        setValue={setBalance}
      />
      <Input label="Budget offset" value={offset} setValue={setOffset} />
      <Input
        label="Start budget"
        value={startBudget ?? 0}
        setValue={setStartBudget}
      />

      <div>
        <Input
          label="Future expenses"
          value={futureExpenses ?? 0}
          setValue={setFutureExpenses}
        />
        <div className="w-56 text-sm mt-2 ml-4">
          For expanses you know that will happen but are not registered in your
          account balance yet. <br /> <i>Future expenses</i> are resetted at the
          beginning of each day.
        </div>
      </div>
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
        <div className="w-56 text-sm mt-2 ml-4">
          The focus mode helps to gain control over your daily spending by
          reducing the observed time period to 10 days. <br /> Obviously you
          should adjust the value for <i>budget offset</i> and{" "}
          <i>start budget</i> accordingly.
        </div>
      </div>
    </div>
  );
};
