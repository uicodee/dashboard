import { OrderOutput } from "@/shared/api/model";
import { create } from "zustand";

interface EditOrderState {
  open: boolean;
  order: OrderOutput | null;
  setOpen: (open: boolean) => void;
  setOrder: (order: OrderOutput) => void;
}

export const useEditOrder = create<EditOrderState>()((set) => ({
  open: false,
  order: null,
  setOpen: (open) => set(() => ({ open: open })),
  setOrder: (order) => set(() => ({ order: order })),
}));
