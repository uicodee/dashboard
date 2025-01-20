import { create } from "zustand";

interface SignInState {
  isMutating: boolean;
  setIsMutating: (isMutating: boolean) => void;
}

export const useSignIn = create<SignInState>()((set) => ({
  isMutating: false,
  setIsMutating: (isMutating) => set(() => ({ isMutating: isMutating })),
}));
