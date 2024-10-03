import { create } from "zustand";

interface CreateCategoryState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCreateCategory = create<CreateCategoryState>()((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open: open })),
}));
