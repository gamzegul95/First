import { cn } from "@/lib/utils";

const baseInputClass =
  "w-full rounded-sm border border-ink-border bg-ink-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none transition-colors focus:border-gold-500";

export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className={cn(baseInputClass, "mt-2")}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={cn(baseInputClass, "mt-2 resize-none")}
      />
    </div>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-ink-border bg-ink-900/40 p-8">
      <h2 className="font-display text-lg font-semibold text-stone-100">{title}</h2>
      {description && <p className="mt-1 text-sm text-stone-500">{description}</p>}
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}
