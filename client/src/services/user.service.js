import { axiosInstance } from '@/lib/axios';

export const userService = {
  // service to fetch user profile
  getCurrentUserProfile: () => axiosInstance.get('/users/profile'),

  // service to update user professional profiles
  updateProfessionalProfiles: newProfessionalProfiles =>
    axiosInstance.patch('/users/professional-profiles', { newProfessionalProfiles }),

  // service to create a user with cohort_admin role
  createCohortAdminUser: userEmail => axiosInstance.post('/users/cohort-admin', { userEmail }),

  // service to delete a user with cohort_admin role
  deleteCohortAdminUser: userEmail => axiosInstance.delete('/users/cohort-admin', { userEmail }),
};
