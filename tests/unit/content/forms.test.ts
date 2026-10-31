import { describe, expect, it } from "vitest";
import { errorCopy } from "@/content/forms";

describe("errorCopy (spec section 13 table)", () => {
  it("adds remaining attempts only when two or fewer are left", () => {
    expect(errorCopy("VERIFICATION_INVALID", { remainingAttempts: 4 })).toBe(
      "That code is not correct. Check the email and try again.",
    );
    expect(errorCopy("VERIFICATION_INVALID", { remainingAttempts: 2 })).toBe(
      "That code is not correct. Check the email and try again. 2 attempts left.",
    );
    expect(errorCopy("VERIFICATION_INVALID", { remainingAttempts: 1 })).toMatch(
      /1 attempt left\.$/,
    );
  });

  it("uses the table's copy for expiry, lockout, and rate limits", () => {
    expect(errorCopy("VERIFICATION_EXPIRED")).toBe("That code has expired. Request a new one.");
    expect(errorCopy("VERIFICATION_LOCKED")).toBe(
      "Too many attempts. Request a new code to continue.",
    );
    expect(errorCopy("RATE_LIMITED")).toBe(
      "Too many requests from this connection. Try again in a few minutes.",
    );
  });

  it("offers the direct email address when sending fails or anything else breaks", () => {
    expect(errorCopy("EMAIL_ERROR")).toMatch(
      /^We could not send the email right now\. Try again, or email us directly at /,
    );
    expect(errorCopy("DB_ERROR")).toMatch(
      /^Something went wrong on our side\. Try again, or email us directly at /,
    );
    expect(errorCopy("INTERNAL")).toBe(errorCopy("DB_ERROR"));
  });

  it("passes specific client messages through", () => {
    expect(errorCopy("CONFLICT", { message: "This email is already confirmed." })).toBe(
      "This email is already confirmed.",
    );
  });

  it("never apologizes", () => {
    for (const code of ["EMAIL_ERROR", "INTERNAL", "RATE_LIMITED", "BOT_CHECK_FAILED"] as const) {
      expect(errorCopy(code)).not.toMatch(/sorry|apolog/i);
    }
  });
});
