import type { ComponentType } from "react";
import BrandCube from "@/components/three/models/BrandCube";
import type { ModelKey } from "@/components/three/models/keys";

/** Every page model by name. Part of the 3D chunk: only ModelCanvas imports it. */
export const MODELS: Record<ModelKey, ComponentType> = {
  "brand-cube": BrandCube,
};
