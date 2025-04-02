import { create } from 'zustand';

export interface DrawerStore {
    editReminderId: string | null;
    isCreateReminderOpen: boolean;
    toggleCreateReminderOpen: (id: string | null) => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
    editReminderId: null,
    isCreateReminderOpen: false,
    toggleCreateReminderOpen: (id: string | null) => set((state) => ({ isCreateReminderOpen: !state.isCreateReminderOpen, editReminderId: id })),
}));
