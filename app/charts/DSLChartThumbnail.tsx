export const DSLChartThumbnail = () => {
  const color = "bg-slate-500";
  return (
    <div className="w-20 h-20 flex flex-col justify-center items-center">
      <div className="w-16">
        <div className="flex flex-row-reverse">
          <div className={`${color} w-8 h-1 mb-1`} />
        </div>
        <div className={`${color} w-full h-3`} />
        <div className={`${color} w-8 h-1 mt-1`} />
      </div>
    </div>
  );
};
