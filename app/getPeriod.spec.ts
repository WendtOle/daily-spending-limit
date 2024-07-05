import { getPeriod } from "./lastDayOfMonth";

describe("getPeriod()", () => {
  it("handles start of third of month in focus mode", () => {
    expect(getPeriod(new Date("2024-06-20"))).toStrictEqual({
      start: 0,
      end: 30,
    });
  });
});
