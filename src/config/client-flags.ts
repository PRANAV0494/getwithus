import { publicEnv } from "@/config/public-env";

/**
 * Flags safe to read in the browser: derived from NEXT_PUBLIC_* variables and
 * NODE_ENV only, through src/config/public-env.ts. Server flags live in src/config/flags.ts.
 */
export const clientFlags = {
  /** Test-only switches such as ?no3d=1. On in development and in builds made with NEXT_PUBLIC_TEST_HOOKS=1. */
  testHooks: publicEnv.nodeEnv !== "production" || publicEnv.testHooks,
} as const;
