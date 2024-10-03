import {create} from 'zustand'

interface CreateOrderState {
    open: boolean
    setOpen: (open: boolean) => void
}

export const useCreateOrder = create<CreateOrderState>()((set) => ({
    open: false,
    setOpen: (open) => set(() => ({open: open})),
}))