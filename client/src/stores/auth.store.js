import { create } from 'zustand';

// create a store for authentication state
export const useAuthStore = create(set => ({
  // initial state for the accessToken
  accessToken: null,

  // function to update the accessToken in the store
  updateAccessToken: newAccessToken => set({ accessToken: newAccessToken }),

  // function to clear the accessToken from the store
  clearAccessToken: () => set({ accessToken: null }),
}));
