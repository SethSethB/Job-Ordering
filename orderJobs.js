exports.orderJobs = jobData => {
  const jobs = JSON.parse(jobData);
  const result = [];

  if (Object.keys(jobs).length === 0) return result;

  for (let childJob in jobs) {
    const parentJob = jobs[childJob];

    //If no parent dependencies & job not present in result add to front
    if (!parentJob && !result.includes(childJob)) result.unshift(childJob);
    //If neither in result add both to end in dependency order
    else if (!result.includes(childJob) && !result.includes(parentJob))
      result.push(parentJob, childJob);
    //If parent already in result add child after it
    else if (result.includes(parentJob)) {
      const parentResultIndex = result.indexOf(parentJob);
      result.splice(parentResultIndex + 1, 0, childJob);
    }
  }

  return result;
};
