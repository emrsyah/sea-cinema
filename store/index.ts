"use client"
import { create } from "zustand";

interface CancelModalStore {
    isOpen: boolean;
    ticketId: number;
    totalPrice: number;
    toggle: () => void;
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
