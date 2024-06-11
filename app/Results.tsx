import { dayToEndOfPeriod } from "./dayToEndOfMonth";
import { lastDayOfPeriod } from "./lastDayOfMonth";
import { useEffect, useState } from "react";
import { readFromLocalStorage } from "./localstorage";
import { FaInfoCircle } from "react-icons/fa";
import {
  BudgetOffsetInformationPopup,
  INFO_POPUP_ID,
} from "./BudgetOffsetInformationPopup";
interface ResultsProps {
  currentBudget: number;
}

export default function Results({ currentBudget }: ResultsProps) {
  const [budgetOffset, setBudgetOffset] = useState<number>(0);
  const [startBudget, setStartBudget] = useState<number | undefined>(undefined);
  const [thirdMonthMode, setThirdMonthMode] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      const { budgetOffset, startBudget, thirdMonthMode } =
        readFromLocalStorage();
      setStartBudget(startBudget);
      setBudgetOffset(budgetOffset ?? 0);
      setThirdMonthMode(thirdMonthMode);
    };
    update();
    window.addEventListener("storage", update);
  }, []);

  const actualCurrentBudget = currentBudget - budgetOffset;
  const actualStartBudget = startBudget
    ? startBudget - budgetOffset
    : undefined;

  const daysLeft = dayToEndOfPeriod(thirdMonthMode);
  const periodLength = thirdMonthMode ? 10 : lastDayOfPeriod(false);
  const daysDone = periodLength - daysLeft;

  const idealDSL = actualStartBudget
    ? actualStartBudget / periodLength
    : undefined;

  const actualCurrentDSL =
    actualStartBudget && actualStartBudget !== actualCurrentBudget
      ? (actualStartBudget - actualCurrentBudget) / daysDone
      : undefined;
  if (actualCurrentBudget < 0) {
    return null;
  }

  return (
    <div className="m-2 mt-8 w-4/5">
      <BudgetOffsetInformationPopup offset={budgetOffset} />
      <div>
        <div className="flex justify-between">
          <p>Money left: </p>
          <div className="flex flex-row items-center space-x-2">
            <p>{actualCurrentBudget} €</p>
            {budgetOffset && (
              <button
                // @ts-ignore
                popovertarget={INFO_POPUP_ID}
              >
                <FaInfoCircle fontSize={16} />
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <p>Days left: </p>
          <p>{daysLeft} d</p>
        </div>

        {idealDSL && (
          <div className="flex justify-between">
            <p>ideal DSL: </p>
            <p>{Math.floor(idealDSL)} €/d</p>{" "}
          </div>
        )}
        {daysLeft !== 0 && (
          <div className="flex justify-between">
            <p>you should target DSL: </p>
            <p>{Math.floor(actualCurrentBudget / daysLeft)} €/d</p>
          </div>
        )}
        {actualCurrentDSL && (
          <div className="flex justify-between">
            <p>actual until now DSL: </p>
            <p>{Math.floor(actualCurrentDSL)} €/d</p>
          </div>
        )}
      </div>
    </div>
  );
}
