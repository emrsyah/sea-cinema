"use client"
import { create } from "zustand";

type GeneralModalStore = {
  isOpen: boolean;
  toggle: () => void;
}
interface CancelModalStore extends GeneralModalStore {
    ticketId: number;
    totalPrice: number;
    setTicket: (ticketId: number) => void
    setTotal: (total: number) => void
}

export const useCancelModalStore = create<CancelModalStore>((set) => ({
  isOpen: false,
  ticketId: -1,
  totalPrice: 0,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setTicket: (ticketId: number) => set((state) => ({ticketId: ticketId})),
  setTotal: (total: number) => set((state) => ({totalPrice: total}))
}));

export const useSettingModalStore = create<GeneralModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
