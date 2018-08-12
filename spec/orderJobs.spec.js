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

  it("Inputs with one dependency return an array containing all job values, with parent job index lower than the dependent child job index", () => {
    let input = '{"a" : "", "b" : "c", "c" : ""}';
    let result = orderJobs(input);
    expect(result).to.have.members(["a", "b", "c"]);
    let cIndex = result.indexOf("c");
    let bIndex = result.indexOf("b");
    expect(cIndex).to.be.lessThan(bIndex);

    input = '{"a" : "", "b" : "", "c" : "a"}';
    result = orderJobs(input);
    expect(result).to.have.members(["a", "b", "c"]);
    aIndex = result.indexOf("a");
    cIndex = result.indexOf("c");
    expect(aIndex).to.be.lessThan(cIndex);
  });

  it("For a valid input with multiple dependencies returns an array containing all job values and honours all dependencies", () => {
    let input =
      '{"a" : "", "b" : "c", "c" : "f", "d" : "a", "e" : "b", "f" : ""}';
    let result = orderJobs(input);
    expect(result).to.have.members(["a", "b", "c", "d", "e", "f"]);
    let aIndex = result.indexOf("a");
    let bIndex = result.indexOf("b");
    let cIndex = result.indexOf("c");
    let dIndex = result.indexOf("d");
    let eIndex = result.indexOf("e");
    let fIndex = result.indexOf("f");
    expect(cIndex).to.be.lessThan(bIndex);
    expect(fIndex).to.be.lessThan(cIndex);
    expect(aIndex).to.be.lessThan(dIndex);
    expect(bIndex).to.be.lessThan(eIndex);

    input = '{"a" : "b", "b" : "c", "c" : "f", "d" : "c", "e" : "b", "f" : ""}';
    result = orderJobs(input);
    expect(result).to.have.members(["a", "b", "c", "d", "e", "f"]);
    aIndex = result.indexOf("a");
    bIndex = result.indexOf("b");
    cIndex = result.indexOf("c");
    dIndex = result.indexOf("d");
    eIndex = result.indexOf("e");
    fIndex = result.indexOf("f");
    expect(bIndex).to.be.lessThan(aIndex);
    expect(cIndex).to.be.lessThan(bIndex);
    expect(fIndex).to.be.lessThan(cIndex);
    expect(cIndex).to.be.lessThan(dIndex);
    expect(bIndex).to.be.lessThan(eIndex);
  });

  it("Throws an error if input includes any jobs which depend on themselves", () => {
    const input = '{"a" : "", "b" : "", "c" : "c"}';
    const errMsg = "Invalid input - Jobs cannot depend on themselves";
    const boundOrderJobsFunction = orderJobs.bind(null, input);
    expect(boundOrderJobsFunction).to.throw(Error, errMsg);
  });

  it("Throws an error if input includes any circular dependencies", () => {
    const input =
      '{"a" : "", "b" : "c", "c" : "f", "d" : "a", "e" : "", "f" : "b"}';
    const errMsg = "Invalid input - Circular dependencies";
    const boundOrderJobsFunction = orderJobs.bind(null, input);
    expect(boundOrderJobsFunction).to.throw(Error, errMsg);
  });

  it("Returns correct result for an input with key value pairs in a mixed-up order", () => {
    input = '{"a" : "b", "d" : "", "b" : "c",  "c" : "d"}';
    result = orderJobs(input);
    expect(result).to.have.members(["a", "b", "c", "d"]);
    aIndex = result.indexOf("a");
    bIndex = result.indexOf("b");
    cIndex = result.indexOf("c");
    dIndex = result.indexOf("d");
    expect(bIndex).to.be.lessThan(aIndex);
    expect(cIndex).to.be.lessThan(bIndex);
    expect(dIndex).to.be.lessThan(cIndex);
  });
});
