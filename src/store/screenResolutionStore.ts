// store/screenResolutionStore.ts
import { create } from "zustand";
import { devtools, persist, PersistOptions } from "zustand/middleware";

interface ScreenResolutionState {
  width: number;
  height: number;
  setSize: (width: number, height: number) => void;
}

const storage: PersistOptions<ScreenResolutionState>["storage"] = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

export const useScreenResolutionStore = create<ScreenResolutionState>()(
  devtools(
    persist(
      (set) => ({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
        setSize: (width, height) => set({ width, height }),
      }),
      {
        name: "screen-size",
        storage,
      }
    )
  )
);
