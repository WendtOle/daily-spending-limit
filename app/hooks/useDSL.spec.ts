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
    actualCurrentDSL: number | undefined;
    isTense: boolean;
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
      actualCurrentDSL: 1.4,
      isTense: false,
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
    expected: {
      idealDSL: 23.4,
      youShouldTargetDSL: 20,
      actualCurrentDSL: 34,
      isTense: true,
    },
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
      actualCurrentDSL: 34,
      isTense: true,
    },
  },
  {
    message:
      "handles situation in which current budget is higher than start budget",
    parameter: {
      startBudget: 400,
      currentBudget: 500,
      offset: 166,
      thirdMonthMode: true,
      futureExpenses: 0,
      today: new Date("2024-06-22"),
    },
    expected: {
      idealDSL: 23.4,
      youShouldTargetDSL: 37.1,
      actualCurrentDSL: 0,
      isTense: false,
    },
  },
  {
    message:
      "another situation in which current budget is higher than start budget",
    parameter: {
      startBudget: 400,
      currentBudget: 656,
      offset: 166,
      thirdMonthMode: true,
      futureExpenses: 326,
      today: new Date("2024-06-23"),
    },
    expected: {
      idealDSL: 23.4,
      youShouldTargetDSL: 20.5,
      actualCurrentDSL: 35,
      isTense: true,
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
