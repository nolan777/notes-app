import { create } from 'zustand';

export const useNotesStore = create<any>((set) => ({
    notes: [],
    addNote: (note) => set((state) => ({ ...state, notes: [...state.notes, note] })),
    deleteNote: (index) => set((state) => ({ ...state, notes: state.notes.filter((_, i) => i !== index) })),
    updateNote: (index, note) => set((state) => ({ ...state, notes: state.notes.map((n, i) => i === index ? note : n) })),
    reset: () => set(() => ({ notes: [] })),
}))
