exports.orderJobs = jobData => {
  const jobs = JSON.parse(jobData);
  const result = [];

  for (let childJob in jobs) {
    const parentJob = jobs[childJob];

    if (childJob === parentJob)
      throw new Error("Invalid input - Jobs cannot depend on themselves");

    const parentResultIndex = result.indexOf(parentJob);
    const childResultIndex = result.indexOf(childJob);

    //If both already in result check they honour dependency
    if (childResultIndex !== -1 && parentResultIndex !== -1) {
      if (parentResultIndex > childResultIndex) {
        throw new Error("Invalid input - Circular dependencies");
      }
    }
    //If no parent dependencies & job not present in result add to front
    else if (!parentJob && childResultIndex === -1) result.unshift(childJob);
    //If neither in result add both to end in dependency order
    else if (parentResultIndex === -1 && childResultIndex === -1)
      result.push(parentJob, childJob);
    //If parent already in result add child after it
    else if (parentResultIndex !== -1)
      result.splice(parentResultIndex + 1, 0, childJob);
    //If child already in result add any non-empty parent before it
    else if (childResultIndex !== -1 && parentJob)
      result.splice(childResultIndex, 0, parentJob);
  }

  return result;
};
