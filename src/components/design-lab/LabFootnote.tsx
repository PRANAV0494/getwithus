import Link from "next/link";
import { cn } from "@/lib/cn";

/** The one line on every concept that says it is a prototype and links back to the gallery. */
export default function LabFootnote({
  letter,
  name,
  className,
}: {
  letter: string;
  name: string;
  className?: string;
}) {
  return (
    <p className={cn("text-sm", className)}>
      Design prototype {letter}: {name}.{" "}
      <Link href="/design" className="underline underline-offset-4">
        Back to the design lab
      </Link>
    </p>
  );
}
