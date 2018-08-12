const { orderJobs } = require("../orderJobs");
const { expect } = require("chai");

describe("orderJobs", () => {
  it("An input of an empty JSON object returns an empty array", () => {
    const input = "{}";
    const result = orderJobs(input);
    expect(result).to.eql([]);
  });

  it("An input of one job with no dependency will return an array with the job value", () => {
    const input = '{"a" : ""}';
    const result = orderJobs(input);
    expect(result).to.eql(["a"]);
  });

  it("An input of jobs with no dependencies will return an array containing all job values in any order", () => {
    const input = '{"a" : "", "b" : "", "c" : ""}';
    const result = orderJobs(input);

    expect(result).to.have.members(["a", "b", "c"]);
  });
});
