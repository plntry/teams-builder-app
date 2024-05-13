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
      chosenSpecializations: [],
      setChosenSpecializations: (specializations) =>
        set(() => ({ chosenSpecializations: specializations })),
    }),
    {
      name: "appStorage",
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default createSelectors(store);
