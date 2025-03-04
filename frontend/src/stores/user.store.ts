import { LoginUserResponse } from '@/common/types/types';
import { create } from 'zustand';

export interface UserStore {
    accessToken: string;
    setUser: (userData: LoginUserResponse) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    accessToken: '',
    setUser: (userData: LoginUserResponse) => set({ accessToken: userData.accessToken }),
}));
