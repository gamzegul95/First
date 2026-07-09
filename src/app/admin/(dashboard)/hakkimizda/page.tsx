import { getAboutContent } from "@/lib/data";
import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import ActionForm from "@/components/admin/ActionForm";
import RepeatingItems from "@/components/admin/RepeatingItems";
import { updateAboutContent } from "./actions";

export default async function AboutContentPage() {
  const about = await getAboutContent();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-50">Hakkımızda</h1>
      <p className="mt-1 text-sm text-stone-400">
        Hakkımızda sayfasındaki hikaye, misyon, vizyon ve değerleri düzenleyin.
      </p>

      <div className="mt-8">
        <ActionForm action={updateAboutContent}>
          <FormSection title="Başlık Bölümü">
            <TextField label="Üst Etiket" name="kicker" defaultValue={about.kicker} />
            <TextField label="Başlık" name="title" defaultValue={about.title} />
            <TextAreaField label="Giriş Metni" name="intro" defaultValue={about.intro} rows={3} />
          </FormSection>

          <FormSection title="Çalışma Anlayışımız">
            <TextField label="Bölüm Başlığı" name="storyTitle" defaultValue={about.storyTitle} />
            <TextAreaField label="Metin" name="storyBody" defaultValue={about.storyBody} rows={5} />
          </FormSection>

          <FormSection title="Misyon & Vizyon">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <TextField label="Misyon Başlığı" name="missionTitle" defaultValue={about.missionTitle} />
                <TextAreaField label="Misyon Metni" name="missionBody" defaultValue={about.missionBody} rows={4} />
              </div>
              <div className="space-y-4">
                <TextField label="Vizyon Başlığı" name="visionTitle" defaultValue={about.visionTitle} />
                <TextAreaField label="Vizyon Metni" name="visionBody" defaultValue={about.visionBody} rows={4} />
              </div>
            </div>
          </FormSection>

          <FormSection title="Değerlerimiz">
            <RepeatingItems name="values" initialItems={about.values} itemLabel="Değer" />
          </FormSection>
        </ActionForm>
      </div>
    </div>
  );
}
