import { create } from "zustand";

export const useInterviewDetails = create((set) => ({
  file: null,

  jobDetails: "",
  setFile: (newFile) => set({ file: newFile }),
  updateJobDetails: (newJobDetails) => set({ jobDetails: newJobDetails }),
}));
