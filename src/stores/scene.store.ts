import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Quality = "high" | "medium" | "low" | "none";

export type StationName = "hero" | "web" | "app" | "automation" | "marketing" | "close";

type SceneState = {
  /** Scroll progress through the home page stations, 0 to 1. */
  progress: number;
  /** The station whose section is in view. Analytics and block styling only; never drives the camera. */
  activeStation: StationName;
  /** Undecided until the canvas picks a tier at mount. */
  quality: Quality | null;
  reducedMotion: boolean;
  canvasReady: boolean;
  setProgress: (progress: number) => void;
  setActiveStation: (station: StationName) => void;
  setQuality: (quality: Quality) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setCanvasReady: (ready: boolean) => void;
};

/**
 * Client state shared by the home page and its 3D scene. `useFrame` reads it with
 * getState() so the render loop never re-renders React.
 */
export const useSceneStore = create<SceneState>()(
  subscribeWithSelector((set) => ({
    progress: 0,
    activeStation: "hero",
    quality: null,
    reducedMotion: false,
    canvasReady: false,
    setProgress: (progress) => set({ progress }),
    setActiveStation: (activeStation) => set({ activeStation }),
    setQuality: (quality) => set({ quality }),
    setReducedMotion: (reducedMotion) => set({ reducedMotion }),
    setCanvasReady: (canvasReady) => set({ canvasReady }),
  })),
);
