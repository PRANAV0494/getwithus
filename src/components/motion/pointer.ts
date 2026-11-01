import { onFrame } from "@/components/motion/frame";

/**
 * One pointermove listener for the whole page, throttled to the shared frame
 * loop: the grid spotlights and magnetic buttons subscribe here instead of
 * each adding its own listener.
 */
type PointerListener = (x: number, y: number) => void;

const listeners = new Set<PointerListener>();
let last = { x: 0, y: 0 };
let pending: (() => void) | null = null;

function flush() {
  pending?.();
  pending = null;
  for (const listener of listeners) listener(last.x, last.y);
}

function onMove(event: PointerEvent) {
  last = { x: event.clientX, y: event.clientY };
  if (!pending) pending = onFrame(flush);
}

/** Calls `listener` with the pointer position at most once a frame, until unsubscribed. */
export function onPointer(listener: PointerListener): () => void {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("pointermove", onMove);
      pending?.();
      pending = null;
    }
  };
}
