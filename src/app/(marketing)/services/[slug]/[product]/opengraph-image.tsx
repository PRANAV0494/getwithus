import { productPages } from "@/content/services";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "GetWithUs service";

export function generateStaticParams() {
  return productPages.map((page) => ({ slug: page.parent?.slug ?? "", product: page.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; product: string }>;
}) {
  const { product } = await params;
  const page = productPages.find((item) => item.slug === product);
  return renderOgImage({
    title: page?.name ?? "Services",
    kicker: page?.parent?.name ?? "Services",
  });
}
