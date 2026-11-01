"use client";

import { useEffect, useRef } from "react";
import { onFrame } from "@/components/motion/frame";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789_";
const KEEP = new Set([" ", "/", ">"]);
const DURATION = 360;

/** The text `progress` (0 to 1) of the way through decoding: revealed left to right, the rest random. */
export function scrambleFrame(text: string, progress: number, random = Math.random): string {
  const revealed = Math.floor(progress * text.length);
  let out = "";
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    out += index < revealed || KEEP.has(char) ? char : CHARS[Math.floor(random() * CHARS.length)];
  }
  return out;
}

type ScrambleTextProps = { text: string; className?: string };

/**
 * A monospaced label that decodes from random characters to its text, left to
 * right over 360 ms, the first time it is fully in view, then again whenever
 * `text` changes (the services figure caption uses that). Screen readers get
 * the text once, never the noise. Still under reduced motion.
 */
export default function ScrambleText({ text, className }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduce) return;
    let stop = () => {};
    const play = () => {
      const start = performance.now();
      stop = onFrame((time) => {
        const progress = Math.min(1, (time - start) / DURATION);
        element.textContent = scrambleFrame(text, progress);
        if (progress >= 1) stop();
      });
    };
    if (seen.current) {
      play();
      return () => stop();
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.current = true;
        observer.disconnect();
        play();
      },
      { threshold: 1 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [text, reduce]);

  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      {/* Keyed by the text, so React never writes into a node the animation has rewritten. */}
      <span key={text} ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
