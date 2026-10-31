"use client";

import { useEffect } from "react";
import { useSceneStore, type StationName } from "@/stores/scene.store";

/**
 * Tracks which home section sits in the middle of the viewport. Sets
 * `activeStation` in the store and `data-current` on that section, which the
 * service blocks use for their lamp-colored rule. Never drives the camera.
 */
export function useActiveStation(): void {
  const setActiveStation = useSceneStore((state) => state.setActiveStation);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-station]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActiveStation(entry.target.getAttribute("data-station") as StationName);
          for (const section of sections) {
            if (section === entry.target) section.dataset.current = "true";
            else delete section.dataset.current;
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveStation]);
}
