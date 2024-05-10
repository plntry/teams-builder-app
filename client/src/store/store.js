import { createStore } from "zustand";
import createSelectors from "./selectors";

const store = createStore((set) => ({
  candidates: [],
  specializations: [],
  compatibilities: [],
  setCandidates: (candidates) => set(() => ({ candidates: candidates })),
  setSpecializations: (specializations) => set(() => ({ specializations: specializations })),
  setCompatibilities: (compatibilities) => set(() => ({ compatibilities: compatibilities }))
}));

export default createSelectors(store);
