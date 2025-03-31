import { create } from 'zustand';

export interface HeaderStore {
    title: string;
    actions: string[];
    setNavigation: (title: string, actions?: string[]) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
    title: '',
    actions: [],
    setNavigation: (title, actions) => set((state) => {
        if (title === state.title) return state;
        return { title, actions: actions || [] };
    }),
}));
