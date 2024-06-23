export const TimeChartThumbnail = () => {
  const color = "bg-slate-500";
  return (
    <div className="w-20 h-20 flex flex-col justify-center items-center">
      <div className="w-16">
        <div className="flex flex-row justify-between mb-1 h-1">
          <div className={`${color} w-4`} />
          <div className={`${color} w-4`} />
        </div>
        <div className={`${color} w-full h-2`} />
        <div className={`${color} w-full h-2 mt-1`} />
        <div className="flex flex-row justify-between mt-1 h-1">
          <div className={`${color} w-4`} />
          <div className={`${color} w-4`} />
        </div>
      </div>
    </div>
  );
};
