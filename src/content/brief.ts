/**
 * Choices in the project brief. Budget labels are owner facts in the owner's
 * currency; the stored values stay stable when the labels change.
 */
export const budgetOptions = [
  { value: "range-1", label: "[OWNER: lowest budget range, for example Under X]" },
  { value: "range-2", label: "[OWNER: second budget range, for example X to Y]" },
  { value: "range-3", label: "[OWNER: third budget range, for example Y to Z]" },
  { value: "range-4", label: "[OWNER: highest budget range, for example Above Z]" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1 to 3 months" },
  { value: "3-6-months", label: "3 to 6 months" },
  { value: "exploring", label: "Exploring" },
] as const;

/** Display label for a stored option value; unknown values (from the API) pass through. */
export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string | null | undefined,
): string | undefined {
  if (!value) return undefined;
  return options.find((option) => option.value === value)?.label ?? value;
}
