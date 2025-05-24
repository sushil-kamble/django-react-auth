import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useAuthStore = create((set) => ({
    allUserData: null, // Use this to store all user data
    loading: false,
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
}));

if (import.meta.env.DEV) {
    mountStoreDevtool('Store', useAuthStore);
}

export { useAuthStore };
