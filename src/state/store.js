import { create } from "zustand";

export const useInterviewDetails = create((set) => ({
  file: null,

  jobDetails: "",
  setFile: (newFile) => set({ file: newFile }),
  updateJobDetails: (newJobDetails) => set({ jobDetails: newJobDetails }),
}));

const bottomBar = create((set) => ({
  isActive: true,
  setActive: (isActive) => set({ isActive }),
}));
const topBar = create((set) => ({
  hasBackButton: false,
  setHasBackButton: (hasBackButton) => set({ hasBackButton }),

  logo: true,
  setLogo: (logo) => set({ logo }),

  home: false,
  setHome: (home) => set({ home }),

  onBack: null, // function reference initially null
  setOnBack: (fn) => {
    set({ onBack: fn });
  },
}));
const padding = create((set) => ({
  isActive: true,
  setActive: (isActive) => set({ isActive }),
}));

export { bottomBar, topBar, padding };