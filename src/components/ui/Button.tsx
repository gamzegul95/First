import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type CommonProps = {
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-[2px] font-medium tracking-[0.02em] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden isolate";

const fill: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-gold-500",
  outline: "bg-gold-800",
  ghost: "bg-transparent",
};

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "border border-gold-500 bg-ink-950 text-foreground hover:text-ink-950 shadow-[0_1px_0_0_rgba(216,191,114,0.15)_inset] hover:shadow-[0_8px_28px_-10px_rgba(200,162,74,0.55)]",
  outline:
    "border border-gold-600/50 bg-transparent text-gold-200 hover:text-foreground hover:border-gold-500/70",
  ghost: "text-gold-300 hover:text-gold-100",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-[0.95rem]",
};

function Fill({ variant }: { variant: NonNullable<CommonProps["variant"]> }) {
  if (variant === "ghost") return null;
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
        fill[variant]
      )}
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <Fill variant={variant} />
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  target,
}: CommonProps & { href: string; target?: string }) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <Fill variant={variant} />
      {children}
    </Link>
  );
}
