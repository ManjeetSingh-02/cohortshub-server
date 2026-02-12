import { axiosInstance } from '@/lib/axios';

export const cohortService = {
  // service to create a new cohort
  createCohort: cohortData => axiosInstance.post('/cohorts', cohortData),

  // service to fetch all cohorts
  getAllCohorts: () => axiosInstance.get('/cohorts'),

  // service to fetch details of a specific cohort
  getCohortDetails: cohortName => axiosInstance.get(`/cohorts/${cohortName}`),

  // service to update cohort description
  updateCohortDescription: (cohortName, newDescription) =>
    axiosInstance.patch(`/cohorts/${cohortName}/description`, {
      cohortDescription: newDescription,
    }),

  // service to process CSV and add users to cohort
  processCSVandAddUsersToCohort: (cohortName, csvFiles) => {
    const formData = new FormData();
    csvFiles.forEach(csvFile => formData.append('csvFiles', csvFile));
    return axiosInstance.patch(`/cohorts/${cohortName}/process-csv`, formData);
  },

  // service to add a user to cohort
  addUserToCohort: (cohortName, userEmail) =>
    axiosInstance.patch(`/cohorts/${cohortName}/add-user`, { userEmail }),

  // service to remove a user from cohort
  removeUserFromCohort: (cohortName, userEmail) =>
    axiosInstance.patch(`/cohorts/${cohortName}/remove-user`, { userEmail }),
};
