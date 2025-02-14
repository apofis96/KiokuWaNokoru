import { create } from 'zustand';

export interface TestStore {
    count: number;
    title: string;
    isLoading: boolean;
    increment: () => void;
    decrement: () => void;
    fetchTitle: () => void;
}

export const useTestStore = create<TestStore>((set) => ({
    count: 0,
    title: '',
    isLoading: false,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    fetchTitle: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        set({ title: data.title, isLoading: false });
    }
}));
