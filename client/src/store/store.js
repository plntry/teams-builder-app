import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import createSelectors from "./selectors";

const store = createStore(
  persist(
    (set) => ({
      // main data
      candidates: [],
      specializations: [],
      compatibilities: [],
      setCandidates: (candidates) => set(() => ({ candidates: candidates })),
      setSpecializations: (specializations) =>
        set(() => ({ specializations: specializations })),
      setCompatibilities: (compatibilities) =>
        set(() => ({ compatibilities: compatibilities })),

      // sidebar
      sidebarSelectedElement: "1",
      setSidebarSelectedElement: (el) =>
        set(() => ({ sidebarSelectedElement: el })),

      // form process
      chosenSpecializations: {},
      setChosenSpecializations: (specializations) =>
        set(() => ({ chosenSpecializations: specializations })),
      chosenCandidates: [],
      setChosenCandidates: (candidates) =>
        set(() => ({ chosenCandidates: candidates })),
      useCustomIterationsNumber: false,
      setUseCustomIterationsNumber: (shouldUse) =>
      set(() => ({ useCustomIterationsNumber: shouldUse })),
      iterationsAmount: 10000,
      setIterationsAmount: (iterationsAmount) =>
      set(() => ({ iterationsAmount: iterationsAmount })),
    }),
    {
      name: "appStorage"
    }
  )
);

export default createSelectors(store);
