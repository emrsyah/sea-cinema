"use client";
import { create } from "zustand";

type GeneralModalStore = {
  isOpen: boolean;
  toggle: () => void;
};
interface CancelModalStore extends GeneralModalStore {
  ticketId: number;
  totalPrice: number;
  setTicket: (ticketId: number) => void;
  setTotal: (total: number) => void;
}


interface ReviewModalStore extends GeneralModalStore {
  movieName: string
  setMovieName: (name: string) => void;
}

export const useCancelModalStore = create<CancelModalStore>((set) => ({
  isOpen: false,
  ticketId: -1,
  totalPrice: 0,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setTicket: (ticketId: number) => set(() => ({ ticketId: ticketId })),
  setTotal: (total: number) => set(() => ({ totalPrice: total })),
}));

export const useSettingModalStore = create<GeneralModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useReviewModalStore = create<ReviewModalStore>((set) => ({
  isOpen: false,
  movieName: "",
  setMovieName: (movieName: string) => set(() => ({ movieName: movieName })),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
