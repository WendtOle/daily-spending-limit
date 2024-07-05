import { Modal } from "../Modal";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { getPeriod } from "../lastDayOfMonth";
import { ModalType } from "./Modals";

export const TimeChartCalculationsModal = () => {
  const {
    startBudget,
    currentBudget,
    offset: budgetOffset,
    pendingTotal,
  } = useLocalstorageValues();

  const { start: startPeriod, end: endPeriod } = getPeriod(new Date());
  const today = new Date().getDate();
  const periodLength = endPeriod - startPeriod;
  const leftPeriod = endPeriod - today + 1;
  const donePeriod = periodLength - leftPeriod;

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
          steps: ["End - start", `${endPeriod} - ${startPeriod}`],
          result: `${periodLength}d`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Period left
        </p>
        {getNew({
          steps: ["End - today + 1", `${endPeriod} - ${today} + 1`],
          result: `${leftPeriod}d`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Period done
        </p>
        {getNew({
          steps: [
            "PeriodLength - leftPeriod",
            `${periodLength} - ${leftPeriod}`,
          ],
          result: `${donePeriod}d`,
        })}
      </div>
    </Modal>
  );
};
