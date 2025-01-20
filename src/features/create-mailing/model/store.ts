import { create } from "zustand";

interface CreateMailingState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCreateMailing = create<CreateMailingState>()((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open: open })),
}));
