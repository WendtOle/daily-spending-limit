import { renderHook } from "@testing-library/react";
import { useDSL } from "./useDSL";

describe("useFetchedData", () => {
  it("should return the initial values for data, error and loading", async () => {
    const parameter = {
      startBudget: 400,
      currentBudget: 389,
      offset: 166,
      thirdMonthMode: true,
      futureExpenses: 2,
      today: new Date("2024-06-20"),
    };

    const { result } = renderHook((props) => useDSL(props), {
      initialProps: parameter,
    });
    const { idealDSL, youShouldTargetDSL, actualCurrentDSL } = result.current;

    expect(idealDSL).toBe(23.4);
    expect(youShouldTargetDSL).toBe(22.1);
    expect(actualCurrentDSL).toBe(13);
  });
});
