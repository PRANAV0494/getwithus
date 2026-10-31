import { caseStudies } from "@/content/case-studies";
import type { CaseStudy } from "@/content/types";

/**
 * Case studies that may be shown publicly: published and with client permission,
 * newest first. Drives the Work nav link, the home section, and /work.
 */
export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies
    .filter((study) => study.published && study.permission)
    .toSorted((a, b) => b.date.localeCompare(a.date));
}
