interface CustomBarChartProps {
  left: number;
  right: number;
  unit?: "days" | "€";
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
  const color = variant === "second" ? "bg-yellow-300" : "bg-yellow-400";
  const roundedOuter = legendTop ? "rounded-tr-none" : "rounded-br-none";
  const roundedInner = legendTop ? "rounded-tl-none" : "rounded-bl-none";
  const order = legendTop ? "flex-col-reverse" : "flex-col";
  const labelLeft = `${right}/${total} ${unit ? `${unit} ` : ""}left`;
  const labelDone = `${left} ${unit ? `${unit} ` : ""}${
    unit === "€" ? "spent" : "passed"
  }`;
  return (
    <div className={`flex ${order}`}>
      <div className="h-12 w-full relative flex items-center rounded-md">
        <div
          className={`rounded-md ${roundedOuter} bg-yellow-100 w-full h-full absolute shadow-lg`}
        />
        <div
          className={`rounded-md ${roundedInner} ${color} h-full absolute y-0 `}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between z-50">
        <div className={`flex ${order} items-start`}>
          <div className={`w-1 h-4 ${color}`} />
          <div className={`px-2 py-1 ${color} w-fit shadow-lg`}>
            {labelDone}
          </div>
        </div>
        <div className={`flex ${order} items-end`}>
          <div className={`w-1 h-4 bg-yellow-100`} />
          <div className={`px-2 py-1 bg-yellow-100 w-fit shadow-lg`}>
            {labelLeft}
          </div>
        </div>
      </div>
    </div>
  );
};
