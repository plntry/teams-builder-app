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

      // bee algorithm parameters
      useCustomParametersValues: false,
      setUseCustomParametersValues: (shouldUse) =>
        set(() => ({ useCustomParametersValues: shouldUse })),
      areaSize: 8,
      setAreaSize: (areaSize) => set(() => ({ areaSize: areaSize })),
      bestSize: 2,
      setBestSize: (bestSize) => set(() => ({ bestSize: bestSize })),
      noImprovementsNum: 5,
      setNoImprovementsNum: (noImprovementsNum) =>
        set(() => ({ noImprovementsNum: noImprovementsNum })),
      amountOfMutations: 2,
      setAmountOfMutations: (amountOfMutations) =>
        set(() => ({ amountOfMutations: amountOfMutations })),

      // bee algorithm main data
      itemNames: [],
      setItemNames: (itemNames) => set(() => ({ itemNames: itemNames })),
      compData: {},
      setCompData: (compData) => set(() => ({ compData: compData })),
      algorithmResult: {
        finalSolution: [],
        maxProductValue: 0,
        performanceData: {
          iterationsCount: 0,
          timeTaken: 0,
        },
      },
      setAlgorithmResult: (algorithmResult) =>
        set(() => ({ algorithmResult: algorithmResult })),
    }),
    {
      name: "appStorage",
    }
  )
);

export default createSelectors(store);
