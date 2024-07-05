import { Modal } from "../Modal";
import { useDSL } from "../hooks/useDSL";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";
import { getPeriod } from "../lastDayOfMonth";
import { ModalType } from "./Modals";

export const DSLChartCalculationsModal = () => {
  const {
    startBudget,
    currentBudget,
    offset: budgetOffset,
    payedFixedCosts,
    pendingFixedCosts,
  } = useLocalstorageValues();

  const {
    idealDSL,
    actualCurrentDSL: actualDSL,
    youShouldTargetDSL: targetDSL,
  } = useDSL({
    startBudget: startBudget ?? 0,
    currentBudget: currentBudget ?? 0,
    offset: budgetOffset,
    futureExpenses: pendingFixedCosts,
    payedFixedCosts,
    pendingFixedCosts,
    today: new Date(),
  });

  const { start: startPeriod, end: endPeriod } = getPeriod(new Date());
  const today = new Date().getDate();
  const periodLength = endPeriod - startPeriod;
  const leftPeriod = endPeriod - today + 1;
  const donePeriod = periodLength - leftPeriod;

  interface Single {
    upper: string;
    lower: string;
  }

  const getNew = ({
    steps,
    result,
  }: {
    steps: [Single, Single] | [Single];
    result?: string;
  }) => {
    return (
      <div className="flex flex-row items-center text-xs">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-center">
            <div key={index + "main"} className="flex flex-col  text-center">
              <p>{step.upper}</p>
              <p className="text-center border-t-2 border-t-slate-400">
                {step.lower}
              </p>
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
    <Modal modalId={ModalType.DSL_CHART_CALCULATIONS} fullScreen>
      <h1 className="uppercase text-xl">DSL Chart Calculation</h1>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Ideal DSL
        </p>
        {getNew({
          steps: [
            {
              upper: "Spending budget",
              lower: "Period length",
            },
          ],
        })}
        {getNew({
          steps: [
            {
              upper: `${startBudget}€`,
              lower: `${periodLength}d`,
            },
          ],
          result: `${idealDSL}€/d`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Actual DSL
        </p>
        {getNew({
          steps: [
            {
              upper: "Money spent",
              lower: "Period done",
            },
            {
              upper: "current - offset - pending fixed costs",
              lower: "Period done",
            },
          ],
        })}
        {getNew({
          steps: [
            {
              upper: `${startBudget}€ - (${currentBudget}€ - ${budgetOffset}€ - ${pendingFixedCosts}€)`,
              lower: `${donePeriod}d`,
            },
            {
              upper: `${
                (startBudget ?? 0) -
                ((currentBudget ?? 0) - (budgetOffset ?? 0) - pendingFixedCosts)
              }€`,
              lower: `${donePeriod}d`,
            },
          ],
          result: `${actualDSL}€/d`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Target DSL
        </p>
        {getNew({
          steps: [
            {
              upper: "Money left",
              lower: "Period left",
            },
            {
              upper: "current - puffer - pending fixed costs",
              lower: "Period left",
            },
          ],
        })}
        {getNew({
          steps: [
            {
              upper: `${currentBudget}€ - ${budgetOffset}€ - ${pendingFixedCosts}€`,
              lower: `${leftPeriod}d`,
            },
            {
              upper: `${
                (currentBudget ?? 0) - budgetOffset - pendingFixedCosts
              }€`,
              lower: `${leftPeriod}d`,
            },
          ],
          result: `${targetDSL}€/d`,
        })}
      </div>
    </Modal>
  );
};
