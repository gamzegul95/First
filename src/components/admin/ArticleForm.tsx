import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ActionForm, { type ActionState } from "@/components/admin/ActionForm";
import type { Article } from "@/generated/prisma/client";

export default function ArticleForm({
  action,
  article,
  saveLabel,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  article?: Article;
  saveLabel?: string;
}) {
  return (
    <ActionForm action={action} saveLabel={saveLabel}>
      <FormSection title="Makale Bilgileri">
        <TextField label="Başlık" name="title" defaultValue={article?.title} required />
        <TextAreaField
          label="Kısa Özet (kart görünümünde gösterilir)"
          name="summary"
          defaultValue={article?.summary}
          rows={2}
          required
        />
        <TextAreaField
          label="İçerik (yeni paragraf için Enter kullanın)"
          name="content"
          defaultValue={article?.content}
          rows={10}
          required
        />
        <ImageUploadField
          label="Kapak Görseli (opsiyonel)"
          name="coverImageUrl"
          defaultValue={article?.coverImageUrl}
        />
        <TextField label="Sıra" name="order" type="number" defaultValue={String(article?.order ?? 0)} />
      </FormSection>
    </ActionForm>
  );
}
