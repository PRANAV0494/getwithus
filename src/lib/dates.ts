const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date (or Date) as "31 October 2026". UTC, so server and client agree. */
export function formatDate(value: string | Date): string {
  return longDate.format(typeof value === "string" ? new Date(value) : value);
}
