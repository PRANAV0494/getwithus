/**
 * The page models WebGLModel can mount, by name. The models themselves live in
 * the 3D chunk (models/index.ts); this file only names them, so pages can pick
 * one without importing three.
 */
export type ModelKey =
  | "brand-cube"
  | "glass-browser"
  | "phone-screens"
  | "node-graph"
  | "phone-bubbles"
  | "handset-rings"
  | "funnel"
  | "server-hub"
  | "services-turntable";

/** Where the camera sits for a model, when the default framing does not fit it. */
export const MODEL_VIEWS: Partial<
  Record<ModelKey, { position: [number, number, number]; fov?: number }>
> = {
  "services-turntable": { position: [0, 3.4, 11.5] },
  "node-graph": { position: [0, 0.8, 8] },
  "server-hub": { position: [0, 0.4, 7.8] },
};
