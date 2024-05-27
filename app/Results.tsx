import { dayToEndOfMonth } from "./dayToEndOfMonth";
import { lastDayOfMonth } from "./lastDayOfMonth";
import { useEffect, useState } from "react";
import { readFromLocalStorage } from "./localstorage";

interface ResultsProps {
  currentBudget: number;
}

export default function Results({ currentBudget }: ResultsProps) {
  const [budgetOffset, setBudgetOffset] = useState<number>(0);
  const [startBudget, setStartBudget] = useState<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const { budgetOffset, startBudget } = readFromLocalStorage();
      setStartBudget(startBudget);
      setBudgetOffset(budgetOffset ?? 0);
    };
    update();
    window.addEventListener("storage", update);
  }, []);

  const actualCurrentBudget = currentBudget - budgetOffset;
  const actualStartBudget = startBudget
    ? startBudget - budgetOffset
    : undefined;
  const idealDSL = actualStartBudget
    ? actualStartBudget / lastDayOfMonth()
    : undefined;
  const days = dayToEndOfMonth();
  const daysToGiveOutNothingToReturnToIdeal = idealDSL
    ? days - actualCurrentBudget / idealDSL
    : undefined;

  if (actualCurrentBudget < 0) {
    return null;
  }

  return (
    <div className="m-2 mt-8 w-4/5">
      <div>
        <div className="flex justify-between">
          <p>Money left: </p>
          <p>{actualCurrentBudget} €</p>
        </div>
        <div className="flex justify-between">
          <p>Days left: </p>
          <p>{days} d</p>
        </div>
        <div className="flex justify-between">
          <p>current DSL: </p>
          <p>{Math.floor(actualCurrentBudget / days)} €/d</p>
        </div>
        {idealDSL && (
          <div className="flex justify-between">
            <p>ideal DSL: </p>
            <p>{Math.floor(idealDSL)} €/d</p>{" "}
          </div>
        )}
      </div>

      {daysToGiveOutNothingToReturnToIdeal &&
        daysToGiveOutNothingToReturnToIdeal > 0 && (
          <div className="pt-4">
            <p className="text-center text-orange-700">
              You have spend more than the ideal DSL!
            </p>
            <p>To reclaim the ideal DSL:</p>
            <ul className="ml-8 list-disc">
              <li>
                {Math.ceil(daysToGiveOutNothingToReturnToIdeal)} d & DSL= 0 €/d
              </li>
            </ul>
          </div>
        )}
    </div>
  );
}
