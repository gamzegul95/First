import { cn } from "@/lib/utils";

export default function SectionKicker({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-400",
        align === "center" && "justify-center",
        className
      )}
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-500" />
      {children}
      {align === "center" && (
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-500" />
      )}
    </div>
  );
}
