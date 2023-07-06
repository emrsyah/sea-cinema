"use client"
import { create } from "zustand";

interface ModalStore {
    isOpen: boolean;
    toggle: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
