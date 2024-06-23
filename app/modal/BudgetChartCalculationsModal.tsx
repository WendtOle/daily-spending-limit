import { start } from "repl";
import { Modal } from "../Modal";
import { useDSL } from "../hooks/useDSL";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { getPeriod } from "../lastDayOfMonth";
import { ModalType } from "./Modals";

export const BudgetChartCalculationsModal = () => {
  const {
    startBudget,
    currentBudget,
    offset: budgetOffset,
    thirdMonthMode,
    pendingTotal,
  } = useLocalstorageValues();

  const {
    idealDSL,
    actualCurrentDSL: actualDSL,
    youShouldTargetDSL: targetDSL,
    isTense,
  } = useDSL({
    startBudget: startBudget ?? 0,
    currentBudget: currentBudget ?? 0,
    thirdMonthMode,
    offset: budgetOffset,
    futureExpenses: pendingTotal,
    today: new Date(),
  });

  const { start: startPeriod, end: endPeriod } = getPeriod(
    thirdMonthMode,
    new Date()
  );
  const today = new Date().getDate();
  const periodLength = endPeriod - startPeriod + 1;
  const leftPeriod = endPeriod - today;
  const donePeriod = periodLength - leftPeriod - 1;

  interface Single {
    upper: string;
    lower: string;
  }

  const getNew = ({ steps, result }: { steps: string[]; result?: string }) => {
    return (
      <div className="flex flex-row items-center text-xs">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-center">
            <div key={index + "main"} className="flex flex-col  text-center">
              <p>{step}</p>
            </div>
            <p className="mx-2">=</p>
          </div>
        ))}
        {result !== undefined && (
          <p className="w-12 text-center font-semibold">{result}</p>
        )}
      </div>
    );
  };

  return (
    <Modal modalId={ModalType.Budget_CHART_CALCULATIONS} fullScreen>
      <h1 className="uppercase text-xl">Budget chart calculation</h1>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Available budget
        </p>
        {getNew({
          steps: ["Current budget - Puffer - pending expenses"],
        })}
        {getNew({
          steps: [`${currentBudget}€ - ${budgetOffset}€ - ${pendingTotal}€`],
          result: `${(currentBudget ?? 0) - budgetOffset - pendingTotal}€`,
        })}
      </div>
    </Modal>
  );
};
