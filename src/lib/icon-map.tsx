import {
  Scale,
  Building2,
  Handshake,
  Landmark,
  Users,
  Briefcase,
  Gavel,
  ShieldCheck,
  FileText,
  Globe,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Scale,
  Building2,
  Handshake,
  Landmark,
  Users,
  Briefcase,
  Gavel,
  ShieldCheck,
  FileText,
  Globe,
  Lightbulb,
};

export function getIcon(name: string | null | undefined): LucideIcon {
  return (name && iconMap[name]) || Scale;
}

export const iconOptions = Object.keys(iconMap);

export function DynamicIcon({
  name,
  className,
}: {
  name: string | null | undefined;
  className?: string;
}) {
  /* eslint-disable react-hooks/static-components -- lucide icons are stable, pre-existing components looked up by key, not created at render time */
  const Icon = getIcon(name);
  return <Icon className={className} />;
  /* eslint-enable react-hooks/static-components */
}
