import { create } from "zustand";


const bottomBar = create ((set) => ({
  isActive: true,
  setActive: (isActive) => set({ isActive }),
}))
const topBar = create((set) => ({
  hasBackButton: false,
  setHasBackButton: (hasBackButton) => set({ hasBackButton }),

  logo: true,
  setLogo: (logo) => set({ logo }),

  home:false ,
  setHome: (home) => set({ home }),
}));




export { bottomBar, topBar };
