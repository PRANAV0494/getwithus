/**
 * Per-frame values every station reads. One rig writes it each frame (scroll on
 * the home page, a fixed pose on service pages); stations only read it, so all
 * of them move from the same numbers.
 */
export type FrameState = {
  /** Eased transition value per station, 0 to 1: hero, web, app, automation, marketing, close. */
  t: number[];
  /** Seconds of animation time; frozen under reduced motion. */
  time: number;
  /** The slab's slow drift while it is still a cloud. */
  slabRotation: number;
  /** Service page panels turn the object slowly. */
  turntable: number;
};

export function createFrameState(t: readonly number[] = [0, 0, 0, 0, 0, 0]): FrameState {
  return { t: [...t], time: 0, slabRotation: 0, turntable: 0 };
}
