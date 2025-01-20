import { create } from "zustand";

interface CreateOrderState {
  isMutating: boolean;
  open: boolean;
  setIsMutating: (isMutating: boolean) => void;
  setOpen: (open: boolean) => void;
}

export const useCreateOrder = create<CreateOrderState>()((set) => ({
  isMutating: false,
  open: false,
  setIsMutating: (isMutating) => set(() => ({ isMutating: isMutating })),
  setOpen: (open) => set(() => ({ open: open })),
}));
