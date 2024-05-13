import { createStore } from "zustand";
import createSelectors from "./selectors";

const store = createStore((set) => ({
  // main data
  candidates: [],
  specializations: [],
  compatibilities: [],
  setCandidates: (candidates) => set(() => ({ candidates: candidates })),
  setSpecializations: (specializations) => set(() => ({ specializations: specializations })),
  setCompatibilities: (compatibilities) => set(() => ({ compatibilities: compatibilities })),

  // sidebar
  sidebarSelectedElement: '1',
  setSidebarSelectedElement: (el) => set(() => ({ sidebarSelectedElement: el })),

  // form process
  chosenSpecializations: [],
  setChosenSpecializations: (specializations) => set(() => ({ chosenSpecializations: specializations })),
}));

export default createSelectors(store);
