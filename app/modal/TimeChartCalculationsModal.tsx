import { Modal } from "../Modal";
import { getPeriod } from "../calculations";
import { ModalType } from "./Modals";
import { useBudgetStore } from "../budgetStore";

export const TimeChartCalculationsModal = () => {
  const { startBudget, currentBudget, budgetOffset, payedFixedCosts, pendingFixedCosts } = useBudgetStore()
  const {
    start: startPeriod,
    end: endPeriod,
    length: periodLength,
    today,
    left: leftPeriod,
    done: donePeriod,
  } = getPeriod(new Date());

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
          steps: [
            `${currentBudget}€ - ${budgetOffset}€ - ${pendingFixedCosts}€`,
          ],
          result: `${(currentBudget ?? 0) - budgetOffset - pendingFixedCosts}€`,
        })}
      </div>
      <div className="p-2 border rounded relative flex flex-col space-y-2 items-center">
        <p className="text-sm absolute -bottom-4 right-0 bg-white px-2 py-1">
          Money spent
        </p>
        {getNew({
          steps: ["Spending budget + puffer + fix costs - current"],
        })}
        {getNew({
          steps: [
            `${startBudget ?? 0}€ + ${budgetOffset}€ + ${pendingFixedCosts + payedFixedCosts
            }€ - ${currentBudget ?? 0}€`,
          ],
          result: `${(startBudget ?? 0) +
            budgetOffset +
            pendingFixedCosts +
            payedFixedCosts -
            (currentBudget ?? 0)
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
            `${(currentBudget ?? 0) - budgetOffset - pendingFixedCosts}€ + ${(startBudget ?? 0) +
            budgetOffset +
            pendingFixedCosts +
            payedFixedCosts -
            (currentBudget ?? 0)
            }€`,
          ],
          result: `${(currentBudget ?? 0) -
            budgetOffset -
            pendingFixedCosts +
            (startBudget ?? 0) +
            budgetOffset +
            pendingFixedCosts +
            payedFixedCosts -
            (currentBudget ?? 0)
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
            "PeriodLength - leftPeriod",
            `${periodLength} - ${leftPeriod}`,
          ],
          result: `${donePeriod}d`,
        })}
      </div>
    </Modal>
  );
};
