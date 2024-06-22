import { renderHook } from "@testing-library/react";
import { useDSL } from "./useDSL";

interface TestEntry {
  message: string;
  parameter: {
    startBudget: number;
    currentBudget: number;
    offset: number;
    thirdMonthMode: boolean;
    futureExpenses: number;
    today: Date;
  };
  expected: {
    idealDSL: number;
    youShouldTargetDSL: number;
    actualCurrentDSL: number;
  };
}

const testData: TestEntry[] = [
  {
    message: "handles end of third month mode with future expense",
    parameter: {
      startBudget: 400,
      currentBudget: 389,
      offset: 166,
      thirdMonthMode: true,
      futureExpenses: 2,
      today: new Date("2024-06-20"),
    },
    expected: {
      idealDSL: 23.4,
      youShouldTargetDSL: 221,
      actualCurrentDSL: 1.3,
    },
  },
  {
    message: "handles first day of third part of third month mode",
    parameter: {
      startBudget: 400,
      currentBudget: 386,
      offset: 166,
      thirdMonthMode: true,
      futureExpenses: 20,
      today: new Date("2024-06-21"),
    },
    expected: { idealDSL: 23.4, youShouldTargetDSL: 20, actualCurrentDSL: 34 },
  },
  {
    message: "handles second day of third part of third month mode",
    parameter: {
      startBudget: 400,
      currentBudget: 386,
      offset: 166,
      thirdMonthMode: true,
      futureExpenses: 20,
      today: new Date("2024-06-22"),
    },
    expected: {
      idealDSL: 23.4,
      youShouldTargetDSL: 22.2,
      actualCurrentDSL: 17,
    },
  },
];

describe("useDSL()", () => {
  testData.forEach(({ message, parameter, expected }) => {
    it(message, async () => {
      const { result } = renderHook((props) => useDSL(props), {
        initialProps: parameter,
      });
      const actual = result.current;

      expect(actual).toStrictEqual(expected);
    });
  });
});
