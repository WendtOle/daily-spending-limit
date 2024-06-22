import Input from "./Input";
import { SETTINGS_MODAL_ID } from "./SettingsModal";
import { useLocalstorageValues } from "./useLocalstorageValues";
export const INPUT_VALUES_MODAL = "input-values-modal-id";

export const InputValuesModal = () => {
  const { currentBudget, setBalance, futureExpenses, setFutureExpenses } =
    useLocalstorageValues();

  const dissmissButtonProps = {
    popovertarget: INPUT_VALUES_MODAL,
    popovertargetaction: "hide",
  };

  const openSettingsButtonProps = {
    popovertarget: SETTINGS_MODAL_ID,
  };

  return (
    <div
      className="p-8 py-6 shadow-xl modal rounded space-y-6"
      id={INPUT_VALUES_MODAL}
      // @ts-ignore
      popover="auto"
    >
      <h1 className="text-xl text-center uppercase tracking-tighter">
        Input values
      </h1>
      <Input
        label="Account balance"
        value={currentBudget ?? 0}
        setValue={setBalance}
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
    </div>
  );
};
