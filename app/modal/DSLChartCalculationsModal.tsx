import { Modal } from "../Modal";
import { useDSL } from "../hooks/useDSL";
import { getLeftMoney, getPeriod } from "../calculations";
import { ModalType } from "./Modals";
import { useBudgetStore } from "../budgetStore";

interface Single {
  upper: string;
  lower: string;
}

interface Props {
  block: [Single, Single] | [Single] | string[];
  result?: string;
}

export const DSLChartCalculationsModal = () => {
  const { startBudget, currentBudget, budgetOffset, pendingFixedCosts } = useBudgetStore()
  const {
    idealDSL,
    actualCurrentDSL: actualDSL,
    youShouldTargetDSL: targetDSL,
  } = useDSL({
    startBudget: startBudget ?? 0,
    currentBudget: currentBudget ?? 0,
    offset: budgetOffset,
    futureExpenses: pendingFixedCosts,
    today: new Date(),
  });

  const {
    length: periodLength,
    done: donePeriod,
    left: leftPeriod,
  } = getPeriod(new Date());

  const availableBudget = getLeftMoney({
    currentBudget: currentBudget ?? 0,
    offset: budgetOffset,
    futureExpenses: pendingFixedCosts,
  });

  const explanations: Array<{ label: string; rows: Props[] }> = [
    {
      label: "Ideal DSL",
      rows: [
        {
          block: [
            {
              upper: "Spending budget",
              lower: "Period length",
            },
            {
              upper: `${startBudget}€`,
              lower: `${periodLength}d`,
            },
          ],
          result: `${idealDSL}€/d`,
        },
      ],
    },
    {
      label: "Available budget",
      rows: [
        {
          block: ["Current budget - Puffer - pending expenses"],
        },
        {
          block: [
            `${currentBudget}€ - ${budgetOffset}€ - ${pendingFixedCosts}€`,
          ],
          result: `${(currentBudget ?? 0) - budgetOffset - pendingFixedCosts}€`,
        },
      ],
    },
    {
      label: "Actual DSL",
      rows: [
        {
          block: [
            {
              upper: "Money spent",
              lower: "Period done",
            },
            {
              upper: "Current - available ",
              lower: "Period done",
            },
          ],
        },
        {
          block: [
            {
              upper: `${startBudget}€ - ${availableBudget}€`,
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
        },
      ],
    },
    {
      label: "Target DSL",
      rows: [
        {
          block: [
            {
              upper: "Money left",
              lower: "Period left",
            },
            {
              upper: "Available budget",
              lower: "Period left",
            },
          ],
        },
        {
          block: [
            {
              upper: `${
                (currentBudget ?? 0) - budgetOffset - pendingFixedCosts
              }€`,
              lower: `${leftPeriod}d`,
            },
          ],
          result: `${targetDSL}€/d`,
        },
      ],
    },
  ];

  const getNew = ({ block: steps, result }: Props) => {
    return (
      <div className="flex flex-row items-center text-xs">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-center">
            <div key={index + "main"} className="flex flex-col  text-center">
              {typeof step === "string" ? (
                <p>{step}</p>
              ) : (
                <>
                  <p>{step.upper}</p>
                  <p className="text-center border-t-2 border-t-slate-400">
                    {step.lower}
                  </p>
                </>
              )}
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
      <>
        {explanations.map(({ label, rows: props }, index) => (
          <div
            key={index}
            className="p-2 border rounded relative flex flex-col space-y-2 items-center"
          >
            <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
              {label}
            </p>
            <>
              {props.map((prop, index) => (
                <div key={index}>{getNew(prop)}</div>
              ))}
            </>
          </div>
        ))}
      </>
    </Modal>
  );
};
