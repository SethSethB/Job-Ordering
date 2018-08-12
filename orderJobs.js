exports.orderJobs = jobData => {
  const jobs = JSON.parse(jobData);
  const result = [];

  if (Object.keys(jobs).length === 0) return result;

  for (let childJob in jobs) {
    const parentJob = jobs[childJob];

    const parentResultIndex = result.indexOf(parentJob);
    const childResultIndex = result.indexOf(childJob);

    //If no parent dependencies & job not present in result add to front
    if (!parentJob && childResultIndex === -1) result.unshift(childJob);
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
