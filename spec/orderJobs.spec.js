const { orderJobs } = require("../orderJobs");
const { expect } = require("chai");

describe("orderJobs", () => {
  it("An input of an empty JSON object returns an empty array", () => {
    const input = "{}";
    const result = orderJobs(input);
    expect(result).to.eql([]);
  });
});
