import {
  caseStudyParams,
  findPublishedCaseStudy,
} from "@/features/case-studies/getPublishedCaseStudies";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "GetWithUs case study";

export function generateStaticParams() {
  return caseStudyParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = findPublishedCaseStudy((await params).slug);
  return renderOgImage({ title: study?.title ?? "Selected work", kicker: "Selected work" });
}
