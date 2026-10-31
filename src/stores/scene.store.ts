import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Quality = "high" | "medium" | "low" | "none";

type SceneState = {
  /** Undecided until a panel picks a tier at mount. */
  quality: Quality | null;
  reducedMotion: boolean;
  setQuality: (quality: Quality) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
};

/**
 * Client state shared by the service page panels and their 3D scene. `useFrame`
 * reads it with getState() so the render loop never re-renders React.
 */
export const useSceneStore = create<SceneState>()(
  subscribeWithSelector((set) => ({
    quality: null,
    reducedMotion: false,
    setQuality: (quality) => set({ quality }),
    setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  })),
);
