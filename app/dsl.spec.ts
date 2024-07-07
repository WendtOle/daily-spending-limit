import {
  getCurrentDSL,
  getIdealDSL,
  getYouShouldTargetDSL,
} from "./calculations";

describe("different DSL calculations", () => {
  describe("ideal DSL calculation", () => {
    it("calculates ideal DSL correctly", () => {
      const startBudget = 232;
      const periodLength = 30;
      const ideal = getIdealDSL({ startBudget, periodLength });
      expect(ideal).toBeCloseTo(7.73);
    });
  });
  describe("current DSL calculation", () => {
    it("handles situation in which money was spent", () => {
      const current = getCurrentDSL({
        spentMoney: 98,
        doneWithoutToday: 8,
      });
      expect(current).toBeCloseTo(12.25);
    });
    it("handles situation in which earned money instead of spent", () => {
      const current = getCurrentDSL({
        spentMoney: -68,
        doneWithoutToday: 22,
      });
      expect(current).toBeCloseTo(0);
    });
  });
  describe("you should target DSL calculation", () => {
    it("handles situation where still some money left", () => {
      const youShouldTarget = getYouShouldTargetDSL({
        leftWithToday: 9,
        leftMoney: 134,
      });
      expect(youShouldTarget).toBeCloseTo(14.888);
    });
    it("handles situation where more money was spent than was available", () => {
      const youShouldTarget = getYouShouldTargetDSL({
        leftWithToday: 9,
        leftMoney: -16,
      });
      expect(youShouldTarget).toBeCloseTo(-1.777);
    });
  });
});
