import { userService } from '@/services/user.service';
import { create } from 'zustand';

// create a store for user information
export const useUserStore = create(set => ({
  // initial state for the user info, loading and error
  userInfo: null,
  isLoading: false,
  hasError: null,

  // function to fetch and update current user information
  fetchUserInfo: async () => {
    try {
      set({ isLoading: true, hasError: null });

      const data = await userService.getCurrentUserProfile();

      set({ userInfo: data });
    } catch (error) {
      set({ hasError: error });
    } finally {
      set({ isLoading: false });
    }
  },

  // function to clear the user information
  clearUserInfo: () => set({ userInfo: null, isLoading: false, hasError: null }),
}));
