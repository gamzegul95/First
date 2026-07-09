"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, Save, AlertCircle } from "lucide-react";

export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-500 hover:bg-[position:100%_0] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Kaydediliyor
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}

export default function ActionForm({
  action,
  children,
  saveLabel = "Kaydet",
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  children: React.ReactNode;
  saveLabel?: string;
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as ActionState);

  return (
    <form action={formAction} className="space-y-6">
      {children}
      <div className="flex items-center gap-4">
        <SaveButton label={saveLabel} />
        {state.status === "success" && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            {state.message ?? "Kaydedildi."}
          </span>
        )}
        {state.status === "error" && (
          <span className="flex items-center gap-1.5 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" />
            {state.message ?? "Bir hata oluştu."}
          </span>
        )}
      </div>
    </form>
  );
}
