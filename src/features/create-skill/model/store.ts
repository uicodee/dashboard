import {create} from 'zustand'

interface CreateSkillState {
    open: boolean
    setOpen: (open: boolean) => void
}

export const useCreateSkill = create<CreateSkillState>()((set) => ({
    open: false,
    setOpen: (open) => set(() => ({open: open})),
}))