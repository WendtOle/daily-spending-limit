import { ThumbnailComponent } from "../components/Gallery";
import { useDSL } from "../hooks/useDSL";
import { useLocalstorageValues } from "../hooks/useLocalstorageValues";

export const DSLChartThumbnail: ThumbnailComponent = ({ grayscale }) => {
  const {
    startBudget,
    currentBudget,
    offset,
    payedFixedCosts,
    pendingFixedCosts,
  } = useLocalstorageValues();
  const { isTense } = useDSL({
    startBudget: startBudget ?? 0,
    currentBudget: currentBudget ?? 0,
    offset,
    futureExpenses: pendingFixedCosts,
    today: new Date(),
  });
  const color = grayscale
    ? "bg-slate-500"
    : isTense
    ? "bg-red-400"
    : "bg-green-400";
  return (
    <div className="w-20 h-20 flex flex-col justify-center items-center">
      <div className="w-16">
        <div className={`flex ${isTense ? "flex-row" : "flex-row-reverse"}`}>
          <div className={`${color} w-8 h-1 mb-1`} />
        </div>
        <div className={`${color} w-full h-3`} />
        <div className={`flex ${!isTense ? "flex-row" : "flex-row-reverse"}`}>
          {" "}
          <div className={`${color} w-8 h-1 mt-1`} />
        </div>
      </div>
    </div>
  );
};
