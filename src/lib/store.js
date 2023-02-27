import { create } from 'zustand'

const useStore = create((set, get) => ({
  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),
  overflow: true,
  setOverflow: (overflow) => set({ overflow }),
}))

export {
  useStore
}