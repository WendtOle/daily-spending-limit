interface CustomBarChartProps {
  left: number;
  right: number;
  unit?: string;
  legendTop?: boolean;
  variant?: "first" | "second";
}

export const CustomBarChart = ({
  left,
  right,
  unit,
  legendTop,
  variant,
}: CustomBarChartProps) => {
  const total = left + right;
  const percentage = Math.min((left / total) * 100, 100);
  const color = variant === "second" ? "bg-yellow-200" : "bg-yellow-300";
  const order = legendTop ? "flex-col-reverse" : "flex-col";
  const labelPlacement =
    percentage > 50
      ? {
          alignment: "items-end",
          order: "justify-start",
          width: percentage - 1,
        }
      : {
          alignment: "items-start",
          order: "justify-end",
          width: 100 - percentage + 2,
        };
  const label = `${right}/${total} ${unit ? `${unit} ` : ""}left`;
  return (
    <div className={`flex ${order}`}>
      <div className="h-12 w-full relative flex items-center rounded-md">
        <div className="rounded-md bg-yellow-50 w-full h-full absolute shadow-lg" />
        <div
          className={`rounded-md ${color} h-full absolute y-0 `}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={`flex ${labelPlacement.order} z-10`}>
        <div
          className={`flex ${order} ${labelPlacement.alignment}`}
          style={{ width: `${labelPlacement.width}%` }}
        >
          <div className={`w-1 h-4 ${color} shadow-lg`} />
          <div className={`px-2 py-1 ${color} w-fit shadow-lg`}>{label}</div>
        </div>
      </div>
    </div>
  );
};
