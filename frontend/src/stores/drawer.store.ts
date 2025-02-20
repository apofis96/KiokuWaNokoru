import { create } from 'zustand';

export interface DrawerStore {
    isCreateReminderOpen: boolean;
    toggleCreateReminderOpen: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
    isCreateReminderOpen: false,
    toggleCreateReminderOpen: () => set((state) => ({ isCreateReminderOpen: !state.isCreateReminderOpen })),
}));
