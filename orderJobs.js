exports.orderJobs = jobData => {
  const jobs = JSON.parse(jobData);
  const result = [];

  if (Object.keys(jobs).length === 0) return result;

  for (let key in jobs) {
    result.unshift(key);
  }

  return result;
};
