import { OrderOutput } from "@/shared/api/model";
import { create } from "zustand";

interface EditOrderState {
  isMutating: boolean;
  open: boolean;
  order: OrderOutput | null;
  setIsMutating: (isMutating: boolean) => void;
  setOpen: (open: boolean) => void;
  setOrder: (order: OrderOutput) => void;
}

export const useEditOrder = create<EditOrderState>()((set) => ({
  isMutating: false,
  open: false,
  order: null,
  setIsMutating: (isMutating) => set(() => ({ isMutating: isMutating })),
  setOpen: (open) => set(() => ({ open: open })),
  setOrder: (order) => set(() => ({ order: order })),
}));
