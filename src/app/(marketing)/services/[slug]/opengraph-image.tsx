import { serviceLinePages } from "@/content/services";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "GetwithUs service";

export function generateStaticParams() {
  return serviceLinePages.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = serviceLinePages.find((item) => item.slug === slug);
  return renderOgImage({ title: page?.name ?? "Services", kicker: "Services" });
}
