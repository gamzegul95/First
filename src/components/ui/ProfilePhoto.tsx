import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePhoto({
  photoUrl,
  name,
  className,
}: {
  photoUrl?: string | null;
  name: string;
  className?: string;
}) {
  if (photoUrl) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={photoUrl} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-ink-800 to-ink-950",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #c2984f 1px, transparent 1px), linear-gradient(to bottom, #c2984f 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <UserRound className="relative h-1/3 w-1/3 text-gold-700/50" strokeWidth={1} />
    </div>
  );
}
