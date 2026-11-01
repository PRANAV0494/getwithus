import { known, site } from "@/config/site";
import type { ProcessStep } from "@/content/types";

/** The same four steps on every project. */
export const processSteps: readonly ProcessStep[] = [
  {
    title: "Scope",
    short:
      "A short call, then a written scope with fixed deliverables, timeline, and price. You decide with the document in hand.",
    detail:
      "A 30-minute call to understand the problem, then a written scope: deliverables, what is excluded, timeline with dates, price, and payment schedule. Nothing starts until you have signed it.",
    needFromYou: [
      "The people who decide, on the call",
      "Access to existing systems we need to see",
      "A date you need to launch by, if there is one",
    ],
    youGet: ["A scope document", "A dated plan", "A fixed price"],
  },
  {
    title: "Build",
    short: "Weekly demos on a live staging link. You see the work, not a status report.",
    detail:
      "Work happens in weekly increments. Every week ends with a demo on a staging link you can open on your own devices, and a short written note of what changed. Scope changes are priced in writing before they are built.",
    needFromYou: [
      "One person who can answer questions within a day",
      "Feedback within the week",
      "Content, brand assets, and account access when the plan says so",
    ],
    youGet: ["A staging link from week one", "Weekly demos", "A changelog"],
  },
  {
    title: "Launch",
    short: "Domain, hosting, analytics, and monitoring set up in accounts you own.",
    detail:
      "We set up the domain, hosting, analytics, error monitoring, and backups in accounts you own, run a launch checklist, and are available on launch day.",
    needFromYou: [
      "Account ownership for domain, hosting, and analytics",
      "Sign-off on the launch checklist",
    ],
    youGet: ["A live site or app", "A launch report", `A ${site.fixWindow} fix window`],
  },
  {
    title: "Run",
    short:
      "A support retainer for changes and on-call if you want it. Otherwise we hand over and step back.",
    detail:
      "After launch you choose: a monthly retainer with defined response times, or a handover with documentation and a recorded walkthrough, after which the work is fully yours.",
    needFromYou: ["A decision on retainer or handover"],
    youGet: ["Documentation", "A recorded handover session", "Optional retainer terms in writing"],
  },
];

/** Where day-to-day conversation happens; left out of the sentence until the owner sets it. */
const channel = known("[OWNER: Slack, WhatsApp, or email]");

/** The closing "Working together" section on /process. */
export const workingTogether: readonly { title: string; text: string }[] = [
  {
    title: "Communication",
    text: channel
      ? `A shared channel on ${channel}, a weekly demo, and a written note each week.`
      : "A shared channel, a weekly demo, and a written note each week.",
  },
  {
    title: "Tooling",
    text: "Code in a repository you own, staging on a link you can open, tasks on a board you can see.",
  },
  {
    title: "Changes",
    text: "Anything outside the written scope is estimated in writing before we build it. You approve it or we skip it.",
  },
];

/**
 * "A sample week" on /process: how a build week runs, restating the Build
 * step (weekly increments, questions answered within a day, a Friday demo on
 * staging with a written note).
 */
export const sampleWeek: readonly { day: string; text: string }[] = [
  { day: "Monday", text: "We agree what this week delivers" },
  { day: "Tuesday", text: "Build, with your questions answered within a day" },
  { day: "Wednesday", text: "Build, and changes priced in writing first" },
  { day: "Thursday", text: "Testing on real devices" },
  { day: "Friday", text: "Demo on staging and a note of what changed" },
];
