import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import ActionForm, { type ActionState } from "@/components/admin/ActionForm";
import { iconOptions } from "@/lib/icon-map";
import type { Service } from "@/generated/prisma/client";

export default function ServiceForm({
  action,
  service,
  saveLabel,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  service?: Service;
  saveLabel?: string;
}) {
  return (
    <ActionForm action={action} saveLabel={saveLabel}>
      <FormSection title="Hizmet Bilgileri">
        <TextField label="Başlık" name="title" defaultValue={service?.title} required />
        <TextAreaField
          label="Kısa Özet (kart görünümünde gösterilir)"
          name="summary"
          defaultValue={service?.summary}
          rows={2}
          required
        />
        <TextAreaField
          label="Detaylı Açıklama"
          name="description"
          defaultValue={service?.description}
          rows={6}
          required
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="icon" className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
              İkon
            </label>
            <select
              id="icon"
              name="icon"
              defaultValue={service?.icon ?? "Scale"}
              className="mt-2 w-full rounded-sm border border-ink-border bg-ink-950/60 px-4 py-2.5 text-sm text-stone-100 outline-none transition-colors focus:border-gold-500"
            >
              {iconOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <TextField label="Sıra" name="order" type="number" defaultValue={String(service?.order ?? 0)} />
        </div>
      </FormSection>
    </ActionForm>
  );
}
