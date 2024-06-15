interface CustomBarChartProps {
  left: number;
  right: number;
  unit?: string;
  legendTop?: boolean;
}

export const CustomBarChart = ({
  left,
  right,
  unit,
  legendTop,
}: CustomBarChartProps) => {
  const total = left + right;
  const percentage = Math.min((left / total) * 100, 100);
  const order = legendTop ? "flex-col-reverse" : "flex-col";
  const margin = legendTop ? "mb-3" : "mt-3";
  return (
    <div className={`flex items-center ${order}`}>
      <div className="h-12 w-full relative flex items-center rounded-md">
        <div className="rounded-md bg-yellow-50 w-full h-full absolute shadow-lg" />
        <div
          className="rounded-md bg-yellow-300 h-full absolute y-0"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={`rounded px-2 py-1 ${margin} shadow`}>
        {right}/{total} {unit ? `${unit} ` : ""}left
      </div>
    </div>
  );
};
