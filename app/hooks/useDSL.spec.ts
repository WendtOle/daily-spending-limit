import { renderHook } from "@testing-library/react";
import { useDSL } from "./useDSL";

interface TestEntry {
  message: string;
  parameter: {
    startBudget: number;
    currentBudget: number;
    offset: number;
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
    message: "handles end of month with future expense",
    parameter: {
      startBudget: 400,
      currentBudget: 389,
      offset: 166,
      futureExpenses: 2,
      today: new Date("2024-06-30"),
    },
    expected: {
      idealDSL: 7.8,
      youShouldTargetDSL: 221,
      actualCurrentDSL: 0.4,
      isTense: false,
    },
  },
  {
    message: "handles first day of month",
    parameter: {
      startBudget: 400,
      currentBudget: 386,
      offset: 166,
      futureExpenses: 20,
      today: new Date("2024-06-01"),
    },
    expected: {
      idealDSL: 7.8,
      youShouldTargetDSL: 6.7,
      actualCurrentDSL: 34,
      isTense: true,
    },
  },
  {
    message: "handles second day of month",
    parameter: {
      startBudget: 400,
      currentBudget: 386,
      offset: 166,
      futureExpenses: 20,
      today: new Date("2024-06-02"),
    },
    expected: {
      idealDSL: 7.8,
      youShouldTargetDSL: 6.9,
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
      futureExpenses: 0,
      today: new Date("2024-06-22"),
    },
    expected: {
      idealDSL: 7.8,
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
      futureExpenses: 326,
      today: new Date("2024-06-23"),
    },
    expected: {
      idealDSL: 7.8,
      youShouldTargetDSL: 20.5,
      actualCurrentDSL: 3.2,
      isTense: false,
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
