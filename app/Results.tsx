import { dayToEndOfMonth } from "./dayToEndOfMonth";
import { lastDayOfMonth } from "./lastDayOfMonth";

interface ResultsProps {
  currentBudget: number;
  startBudget: number;
  budgetOffset: number;
}

export default function Results({
  currentBudget,
  startBudget,
  budgetOffset,
}: ResultsProps) {
  const actualCurrentBudget = currentBudget - budgetOffset;
  const actualStartBudget = startBudget - budgetOffset;
  const idealDSL = actualStartBudget / lastDayOfMonth();
  const days = dayToEndOfMonth();
  const daysToGiveOutNothingToReturnToIdeal =
    days - actualCurrentBudget / idealDSL;

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
        <div className="flex justify-between">
          <p>ideal DSL: </p>
          <p>{Math.floor(idealDSL)} €/d</p>{" "}
        </div>
      </div>

      {daysToGiveOutNothingToReturnToIdeal > 0 && (
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
