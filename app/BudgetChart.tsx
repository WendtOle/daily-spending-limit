import { FaEdit } from "react-icons/fa";
import { SETTINGS_MODAL_ID } from "./SettingsModal";
import { useLocalstorageValues } from "./useLocalstorageValues";

export const BudgetChart = () => {
  const { currentBudget, offset } = useLocalstorageValues();

  if (currentBudget === undefined) {
    return null;
  }

  const available = currentBudget - offset;
  const percent = (available / currentBudget) * 100;

  const editButtonProps = {
    popovertarget: SETTINGS_MODAL_ID,
  };

  return (
    <div className={`flex  flex-col w-80 sm:w-96 mt-4`}>
      <div className="flex w-full justify-between items-end">
        <div className={`flex items-start flex-col`}>
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
      <div className="h-16 w-full flex items-end rounded-md rounded-tl-none rounded-md bg-blue-100 h-full w-full">
        <div className="relative w-full h-12">
          <div
            className={`rounded-md bg-blue-400 h-full rounded-bl-none shadow-lg absolute`}
            style={{
              width: `${percent - 0.5}%`,
            }}
          />
          <div className="w-full flex items-end h-full justify-end absolute">
            <div
              className={`rounded-md bg-blue-300 h-12 rounded-br-none shadow-lg`}
              style={{
                width: `${100 - percent - 0.5}%`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between z-50 w-full h-10 relative">
        <div className={`flex flex-col items-start absolute left-0 `}>
          <div className={`w-1 h-4 bg-blue-400`} />
          <div className={`px-2 py-1 bg-blue-400 w-fit shadow-lg`}>
            Available: {available}€
          </div>
        </div>
        <div className={`flex flex-col items-end absolute right-0`}>
          <div className={`w-1 h-4 bg-blue-300 shadow-lg`} />
          <div
            className={`px-2 py-1 bg-blue-300 w-fit shadow-lg flex flex-row items-center`}
          >
            <span>Offset: {offset}€</span>
            <button className="ml-4" {...editButtonProps}>
              <FaEdit fontSize={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
