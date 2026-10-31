"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Entry = { key: string; label: string; href: string };

const DEVICES = [
  { id: "desktop", label: "Desktop 1440", width: 1440, height: 900 },
  { id: "tablet", label: "Tablet 834", width: 834, height: 1112 },
  { id: "phone", label: "Phone 390", width: 390, height: 844 },
] as const;

type Device = (typeof DEVICES)[number];

/** A live page at a real device width, scaled down to fit its column. */
function DeviceFrame({ entry, device }: { entry: Entry; device: Device }) {
  const box = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([item]) => setAvailable(item.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scale = available ? Math.min(1, available / device.width) : 0;
  return (
    <div ref={box} className="w-full">
      <div
        className="relative mx-auto overflow-hidden rounded-card border border-line-strong bg-ink-2"
        style={{ width: device.width * scale, height: device.height * scale }}
      >
        {scale > 0 ? (
          <iframe
            key={`${entry.href}-${device.id}`}
            src={entry.href}
            title={`${entry.label} at ${device.label}`}
            width={device.width}
            height={device.height}
            className="absolute top-0 left-0 border-0"
            style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
          />
        ) : null}
      </div>
      <p className="mt-3 flex items-center justify-between gap-4 type-small text-fog-2">
        <span>
          {entry.label}, {device.label} px
          {scale < 1 ? `, shown at ${Math.round(scale * 100)} percent` : ""}
        </span>
        <a
          href={entry.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-signal hover:text-signal-2"
        >
          Open full page
          <Icon icon={ExternalLink} size={16} />
        </a>
      </p>
    </div>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex flex-wrap gap-1 rounded-control border border-line bg-ink-2 p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-[4px] px-3 py-1.5 type-small font-medium text-fog-2 transition-colors duration-150 hover:text-fog",
            value === option.value && "bg-signal text-ink hover:text-ink",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ConceptSelect({
  id,
  label,
  entries,
  value,
  onChange,
}: {
  id: string;
  label: string;
  entries: readonly Entry[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="grid gap-1.5 type-small text-fog-2">
      {label}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="h-10 rounded-control border border-line-strong bg-ink-2 px-3 text-fog"
      >
        {entries.map((entry) => (
          <option key={entry.key} value={entry.key}>
            {entry.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * The gallery's inspector: one concept at a time or two side by side, at
 * desktop, tablet, or phone width. Every frame is the real page, so menus,
 * tabs, hover states, and scroll reveals all work inside it.
 */
export default function ConceptViewer({ entries }: { entries: readonly Entry[] }) {
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [deviceId, setDeviceId] = useState<Device["id"]>("desktop");
  const [current, setCurrent] = useState(entries[0]?.key ?? "");
  const [left, setLeft] = useState(entries[0]?.key ?? "");
  const [right, setRight] = useState(entries[1]?.key ?? "");

  const device = DEVICES.find((item) => item.id === deviceId) ?? DEVICES[0];
  const byKey = (key: string) => entries.find((entry) => entry.key === key) ?? entries[0];

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          label="View"
          value={mode}
          onChange={setMode}
          options={[
            { value: "single", label: "One at a time" },
            { value: "compare", label: "Side by side" },
          ]}
        />
        <Segmented
          label="Device width"
          value={deviceId}
          onChange={setDeviceId}
          options={DEVICES.map((item) => ({ value: item.id, label: item.label }))}
        />
      </div>

      {mode === "single" ? (
        <>
          <Segmented
            label="Concept"
            value={current}
            onChange={setCurrent}
            options={entries.map((entry) => ({ value: entry.key, label: entry.label }))}
          />
          <DeviceFrame entry={byKey(current)} device={device} />
        </>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid content-start gap-4">
            <ConceptSelect
              id="compare-left"
              label="Left"
              entries={entries}
              value={left}
              onChange={setLeft}
            />
            <DeviceFrame entry={byKey(left)} device={device} />
          </div>
          <div className="grid content-start gap-4">
            <ConceptSelect
              id="compare-right"
              label="Right"
              entries={entries}
              value={right}
              onChange={setRight}
            />
            <DeviceFrame entry={byKey(right)} device={device} />
          </div>
        </div>
      )}
    </div>
  );
}
