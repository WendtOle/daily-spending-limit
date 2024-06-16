interface CustomBarChartProps {
  idealDSL: number;
  actualDSL: number;
  targetDSL: number;
}

export const DSLChart = ({
  idealDSL,
  actualDSL,
  targetDSL,
}: CustomBarChartProps) => {
  const sortedValues = [
    { label: "idealDSL", value: idealDSL },
    ...(targetDSL !== 0 ? [{ label: "targetDSL", value: targetDSL }] : []),
    { label: "actualDSL", value: actualDSL },
  ].sort((left, right) => (left.value < right.value ? 1 : -1));

  const maxValue = Math.max(...sortedValues.map((v) => v.value));
  const valuesToPlot = sortedValues.map((v) => (v.value / maxValue) * 100);

  const colorPalette =
    actualDSL > idealDSL
      ? ["bg-red-100", "bg-red-200", "bg-red-300"]
      : ["bg-green-100", "bg-green-200", "bg-green-300"];

  return (
    <div className={`flex  flex-col`}>
      <div className="h-12 w-full relative flex items-center rounded-md">
        {valuesToPlot.map((value, index) => {
          const bgColor = colorPalette[index];
          return (
            <div
              key={index}
              className={`rounded-md ${bgColor} h-full absolute y-0`}
              style={{ width: `${value}%` }}
            />
          );
        })}
      </div>
      <div className="flex justify-between flex-row-reverse">
        {sortedValues.map(({ label, value }, index) => (
          <div
            key={label}
            className={`rounded px-2 py-1 mt-2 shadow flex flex-col items-center ${colorPalette[index]}`}
          >
            <span>{value}€/d</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="bg-red-100" />
      <div className="bg-red-200" />
      <div className="bg-red-300" />
      <div className="bg-green-100" />
      <div className="bg-green-200" />
      <div className="bg-green-300" />
    </div>
  );
};
