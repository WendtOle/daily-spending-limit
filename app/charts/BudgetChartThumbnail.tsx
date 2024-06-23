import { ThumbnailComponent } from "../Gallery";

export const BudgetChartThumbnail: ThumbnailComponent = ({ grayscale }) => {
  const color = grayscale ? "bg-slate-500" : "bg-blue-600";
  return (
    <div className="w-20 h-20 pt-4">
      <div className="flex flex-row h-10 justify-center">
        <div className={`${color} h-full w-4`} />
        <div className="flex flex-col justify-between w-6">
          <div className={`${color} h-1 ml-1`} />
          <div className={`${color} h-1 ml-1`} />
          <div className={`${color} h-1 ml-1`} />
          <div className={`${color} h-1 ml-1`} />
        </div>
      </div>
    </div>
  );
};
