import { FaEdit } from "react-icons/fa";
import { SETTINGS_MODAL_ID } from "./SettingsModal";
import { useLocalstorageValues } from "./useLocalstorageValues";

export const BudgetChart = () => {
  const { currentBudget, offset, futureExpenses } = useLocalstorageValues();

  if (currentBudget === undefined) {
    return null;
  }

  const available = currentBudget - offset - futureExpenses;
  const futureExpensesPercent = Math.max(
    (futureExpenses / currentBudget) * 100,
    2
  );
  const availablePercent = Math.max((available / currentBudget) * 100, 0);

  const remainingPuffer = available < 0 ? offset + available : offset;

  const editButtonProps = {
    popovertarget: SETTINGS_MODAL_ID,
  };

  return (
    <div className={`flex flex-col w-80 sm:w-96 mt-4`}>
      <div className="flex w-full justify-between items-end">
        <div className={`flex items-center flex-col w-full`}>
          <div
            className={`px-2 py-1 flex flex-row items-center bg-blue-100 z-50`}
          >
            <span>Account balance: {currentBudget}€</span>
            <button className="ml-4" {...editButtonProps}>
              <FaEdit fontSize={16} />
            </button>
          </div>
          <div className={`w-1 h-4 bg-blue-100 z-50`} />
        </div>
      </div>
      <div className="h-16 w-full flex items-end rounded-md rounded-tl-none rounded-md bg-blue-100 w-full">
        <div className="relative w-full h-12">
          <div
            className={`rounded-md bg-blue-600 h-full rounded-bl-none shadow-lg absolute`}
            style={{
              width: `${availablePercent - 0.5}%`,
            }}
          />
          {futureExpensesPercent > 0 && (
            <div
              className={`rounded-md bg-blue-400 h-full rounded-bl-none shadow-lg absolute`}
              style={{
                left: `${availablePercent + 0.5}%`,
                width: `${futureExpensesPercent - 0.5}%`,
              }}
            />
          )}
          <div className="w-full flex items-end h-full justify-end absolute">
            <div
              className={`rounded-md bg-blue-300 h-12 rounded-br-none shadow-lg`}
              style={{
                width: `${100 - availablePercent - futureExpensesPercent - 1}%`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between z-50 w-full h-24 relative">
        <div className={`flex flex-col items-center w-full`}>
          <div className="h-16 w-full relative">
            <div
              className={`w-1 h-16 bg-blue-400 absolute ${
                futureExpenses <= 0 ? "w-0" : "w-1"
              }`}
              style={{
                left: `${futureExpenses > 0 ? availablePercent + 0.5 : 0}%`,
              }}
            />
          </div>
          <div className={`px-2 py-1 bg-blue-400 w-fit shadow-lg text-white`}>
            <span>
              {futureExpenses === 0
                ? "No future expenses"
                : `Future expenses: ${futureExpenses}€`}
            </span>
            <button className="ml-4" {...editButtonProps}>
              <FaEdit fontSize={16} />
            </button>
          </div>
        </div>
        <div className={`flex flex-col items-start absolute left-0 `}>
          <div className={`w-1 h-4 bg-blue-600`} />
          <div className={`px-2 py-1 bg-blue-600 w-fit shadow-lg text-white`}>
            Available: {Math.max(available, 0)}€
          </div>
        </div>

        <div className={`flex flex-col items-end absolute right-0`}>
          <div className={`w-1 h-4 bg-blue-300 shadow-lg`} />
          <div
            className={`px-2 py-1 bg-blue-300 w-fit shadow-lg flex flex-row items-center`}
          >
            <span>
              {remainingPuffer < offset
                ? `Puffer: ${remainingPuffer}/${offset}`
                : `Offset: ${offset}`}{" "}
              €
            </span>
            <button className="ml-4" {...editButtonProps}>
              <FaEdit fontSize={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
