import { CodeXml, TrendingUp, Workflow } from "lucide-react";
import Icon from "@/components/ui/Icon";
import type { PracticeId } from "@/content/design-lab/content";

const ICONS = { engineering: CodeXml, growth: TrendingUp, ai: Workflow } as const;

/** The icon for one of the three practices, at the project's fixed stroke width. */
export default function PracticeIcon({
  id,
  size = 20,
  className,
}: {
  id: PracticeId;
  size?: 16 | 20 | 24;
  className?: string;
}) {
  return <Icon icon={ICONS[id]} size={size} className={className} />;
}
