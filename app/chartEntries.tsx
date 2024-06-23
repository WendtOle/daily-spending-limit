import { BudgetChart } from "./charts/BudgetChart";
import { BudgetChartThumbnail } from "./charts/BudgetChartThumbnail";
import { DSLChart } from "./charts/DSLChart";
import { DSLChartThumbnail } from "./charts/DSLChartThumbnail";
import TimeChart from "./charts/TimeChart";
import { TimeChartThumbnail } from "./charts/TimeChartThumbnail";

export const chartEntries = [
  {
    component: <BudgetChart />,
    label: "Budget",
    color: "bg-blue-400",
    text: "This chart gives you an easy overview over your account balance. It gives you an idea of how much many you have actually available from the total money which you have on your bank account.",
    thumbnail: BudgetChartThumbnail,
  },
  {
    component: <DSLChart />,
    label: "DSL",
    color: "bg-red-400",
    text: "This chart gives you an idea how much money you should spend on average each day to stay within your budget. The chart is based on the start budget and the budget offset.",
    thumbnail: DSLChartThumbnail,
  },
  {
    component: <TimeChart />,
    label: "Time",
    color: "bg-yellow-400",
    text: "This chart gives you an idea how much money you have spent from your money in relation to the time left.",
    thumbnail: TimeChartThumbnail,
  },
];
