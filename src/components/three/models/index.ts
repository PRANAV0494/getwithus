import type { ComponentType } from "react";
import BrandCube from "@/components/three/models/BrandCube";
import Funnel from "@/components/three/models/Funnel";
import GlassBrowser from "@/components/three/models/GlassBrowser";
import HandsetRings from "@/components/three/models/HandsetRings";
import type { ModelKey } from "@/components/three/models/keys";
import NodeGraph from "@/components/three/models/NodeGraph";
import PhoneBubbles from "@/components/three/models/PhoneBubbles";
import PhoneScreens from "@/components/three/models/PhoneScreens";
import ServerHub from "@/components/three/models/ServerHub";
import ServicesTurntable from "@/components/three/models/ServicesTurntable";

/** Every page model by name. Part of the 3D chunk: only ModelCanvas imports it. */
export const MODELS: Record<ModelKey, ComponentType> = {
  "brand-cube": BrandCube,
  "glass-browser": GlassBrowser,
  "phone-screens": PhoneScreens,
  "node-graph": NodeGraph,
  "phone-bubbles": PhoneBubbles,
  "handset-rings": HandsetRings,
  funnel: Funnel,
  "server-hub": ServerHub,
  "services-turntable": ServicesTurntable,
};
