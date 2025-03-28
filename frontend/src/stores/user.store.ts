import { LoginUserResponse } from '@/common/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export interface UserStore {
    accessToken?: string | null;
    setUser: (userData: LoginUserResponse) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            accessToken: null,
            setUser: (userData: LoginUserResponse) => set({ accessToken: userData.accessToken }),
            logout: () => set({ accessToken: null }),
        }),
        {
            name: 'user-storage',
        },
    ));
