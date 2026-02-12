import { authService } from '@/services/auth.service';
import { create } from 'zustand';

// create a store for authentication
export const useAuthStore = create(set => ({
  // initial state for the accessToken
  accessToken: null,

  // function to update the accessToken in the store
  updateAccessToken: newAccessToken => set({ accessToken: newAccessToken }),

  // function to logout the user
  logout: async (useAPICall = true) => {
    try {
      if (useAPICall) await authService.logoutUser();
    } catch (error) {
      // TODO: handle error (e.g., show a notification to the user)
    } finally {
      set({ accessToken: null });
    }
  },
}));
