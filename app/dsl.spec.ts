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
    it("handles situation available budget < start budget", () => {
      const current = getCurrentDSL({
        startBudget: 232,
        availableBudget: 134,
        doneWithoutToday: 8,
      });
      expect(current).toBeCloseTo(12.25);
    });
    it("handles situation available budget > start budget", () => {
      const current = getCurrentDSL({
        startBudget: 232,
        availableBudget: 300,
        doneWithoutToday: 22,
      });
      expect(current).toBeCloseTo(0);
    });
  });
  describe("you should target DSL calculation", () => {
    it("handles situation where avaible budget is positive", () => {
      const youShouldTarget = getYouShouldTargetDSL({
        leftWithToday: 9,
        availableBudget: 134,
      });
      expect(youShouldTarget).toBeCloseTo(14.888);
    });
    it("handles situation where avaible budget is negative", () => {
      const youShouldTarget = getYouShouldTargetDSL({
        leftWithToday: 9,
        availableBudget: -16,
      });
      expect(youShouldTarget).toBeCloseTo(-1.777);
    });
  });
});
