interface CustomBarChartProps {
  idealDSL: number;
  actualDSL: number;
  targetDSL: number;
}

enum DSL {
  IDEAL = "ideal",
  TARGET = "target",
  ACTUAL = "actual",
}

export const DSLChart = ({
  idealDSL,
  actualDSL,
  targetDSL,
}: CustomBarChartProps) => {
  const data = {
    [DSL.IDEAL]: { value: idealDSL, color: "bg-red-200" },
    [DSL.TARGET]: { value: targetDSL, color: "bg-red-300" },
    [DSL.ACTUAL]: { value: actualDSL, color: "bg-red-100" },
  };

  const targetSpending = targetDSL < idealDSL ? DSL.TARGET : DSL.IDEAL;
  const [smallerDSL, biggerDSL] =
    data[targetSpending].value > actualDSL
      ? [DSL.ACTUAL, targetSpending]
      : [targetSpending, DSL.ACTUAL];

  const mode = targetSpending === DSL.IDEAL ? "relaxed" : "tense";
  const accent = mode === "tense" ? "bg-red-400" : "bg-green-300";
  const minor = mode === "tense" ? "bg-red-100" : "bg-green-200";
  const [topLabelColor, bottomLabelColor] =
    mode === "tense" ? [accent, minor] : [minor, accent];
  const [topLabelAlignment, bottomLabelAlignment] =
    mode === "relaxed"
      ? ["items-end", "items-start"]
      : ["items-start", "items-end"];
  const [accentRounding, minorRounding] =
    mode === "tense"
      ? ["rounded-tl-none", "rounded-br-none"]
      : ["rounded-bl-none", "rounded-tr-none"];

  const getLabel = ({
    color,
    label,
    alignment,
    bottom,
  }: {
    label: string;
    color: string;
    alignment: string;
    bottom?: boolean;
  }) => {
    const shadow = bottom ? "" : "shadow-lg";
    return (
      <div
        className={`flex ${alignment} ${
          bottom ? "flex-col-reverse" : "flex-col"
        }`}
      >
        <div
          className={`px-2 py-1 ${shadow} flex flex-col items-center ${color} z-50`}
        >
          <span>{label}</span>
        </div>
        <div className={`w-1 h-4 ${color} ${shadow} z-50`} />
      </div>
    );
  };

  const topLabel = getLabel({
    color: topLabelColor,
    label: `Target spending: ${data[targetSpending].value} €/d`,
    alignment: topLabelAlignment,
  });

  const bottomLabel = getLabel({
    color: bottomLabelColor,
    label: `You actual spent: ${data[DSL.ACTUAL].value} €/d`,
    alignment: bottomLabelAlignment,
    bottom: true,
  });

  return (
    <div className={`flex  flex-col`}>
      {topLabel}
      <div className="h-12 w-full relative flex items-center rounded-md">
        <div
          className={`rounded-md ${minor} h-full w-full absolute y-0 ${minorRounding}`}
        />
        <div
          className={`rounded-md ${accent} h-full absolute y-0 ${accentRounding} shadow-lg`}
          style={{
            width: `${(data[smallerDSL].value / data[biggerDSL].value) * 100}%`,
          }}
        />
      </div>
      {bottomLabel}
    </div>
  );
};
