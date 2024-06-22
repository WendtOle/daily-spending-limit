import { getPeriod } from "./lastDayOfMonth";

describe("getPeriod()", () => {
  it("handles start of third of month in focus mode", () => {
    expect(getPeriod(true, new Date("2024-06-20"))).toStrictEqual({
      start: 11,
      end: 20,
    });
  });
});
