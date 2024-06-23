import { start } from "repl";
import { Modal } from "../Modal";
import { useDSL } from "../hooks/useDSL";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { getPeriod } from "../lastDayOfMonth";
import { ModalType } from "./Modals";

export const TimeChartCalculationsModal = () => {
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
          <p className="text-center font-semibold">{result}</p>
        )}
      </div>
    );
  };

  return (
    <Modal modalId={ModalType.TIME_CHART_CALCULATIONS} fullScreen>
      <h1 className="uppercase text-xl">Time chart calculation</h1>

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
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Money spent
        </p>
        {getNew({
          steps: ["Start budget - current + pending"],
        })}
        {getNew({
          steps: [
            `${startBudget ?? 0}€ - ${currentBudget ?? 0}€ + ${pendingTotal}€`,
          ],
          result: `${
            (startBudget ?? 0) - (currentBudget ?? 0) + pendingTotal
          }€`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Total budget
        </p>
        {getNew({
          steps: ["Available budget + money spent"],
        })}
        {getNew({
          steps: [
            `${(currentBudget ?? 0) - budgetOffset - pendingTotal}€ + ${
              (startBudget ?? 0) - (currentBudget ?? 0) + pendingTotal
            }€`,
          ],
          result: `${
            (currentBudget ?? 0) -
            budgetOffset -
            pendingTotal +
            (startBudget ?? 0) -
            (currentBudget ?? 0) +
            pendingTotal
          }€`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Period length
        </p>
        {getNew({
          steps: ["End - start + 1", `${endPeriod} - ${startPeriod} + 1`],
          result: `${periodLength}d`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Period left
        </p>
        {getNew({
          steps: ["End - today", `${endPeriod} - ${today}`],
          result: `${leftPeriod}d`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Period done
        </p>
        {getNew({
          steps: [
            "PeriodLength - leftPeriod + 1",
            `${periodLength} - ${leftPeriod} + 1`,
          ],
          result: `${donePeriod}d`,
        })}
      </div>
    </Modal>
  );
};
