/**
 * Per-frame values every station reads. The station rig writes it each frame;
 * stations only read it, so all of them move from the same numbers.
 */
export type FrameState = {
  /** Eased transition value per station, 0 to 1: hero, web, app, automation, marketing, close. */
  t: number[];
  /** Seconds of animation time; frozen under reduced motion. */
  time: number;
  /** The slab's drift while it is still a cloud. Panels hold it at 0. */
  slabRotation: number;
  /** Service page panels turn the object slowly. */
  turntable: number;
};

export function createFrameState(t: readonly number[] = [0, 0, 0, 0, 0, 0]): FrameState {
  return { t: [...t], time: 0, slabRotation: 0, turntable: 0 };
}
