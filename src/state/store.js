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

  home: false,
  setHome: (home) => set({ home }),

  onBack: null, // function reference initially null
  setOnBack: (fn) => {set({ onBack: fn }); console.log("updated on back",fn);},
}));




export { bottomBar, topBar };
