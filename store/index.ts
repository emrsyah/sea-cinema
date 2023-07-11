"use client";
import { PickedReviewType } from "@/types";
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
  movieName: string;
  review?: PickedReviewType;
  setMovieName: (name: string) => void;
  setReview: (review: PickedReviewType) => void;
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
  review: {
    id: -1,
    rating: 5,
    review: "",
  },
  setReview: (review: PickedReviewType) => set(() => ({ review: review })),
  setMovieName: (movieName: string) => set(() => ({ movieName: movieName })),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
