import { getHomeContent } from "@/lib/data";
import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import ActionForm from "@/components/admin/ActionForm";
import RepeatingItems from "@/components/admin/RepeatingItems";
import { updateHomeContent } from "./actions";

export default async function HomeContentPage() {
  const home = await getHomeContent();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-50">Ana Sayfa</h1>
      <p className="mt-1 text-sm text-stone-400">
        Ana sayfadaki hero, istatistik ve &ldquo;Neden Biz&rdquo; bölümlerini düzenleyin.
      </p>

      <div className="mt-8">
        <ActionForm action={updateHomeContent}>
          <FormSection title="Hero Bölümü">
            <TextField label="Üst Etiket" name="heroKicker" defaultValue={home.heroKicker} />
            <TextAreaField
              label="Başlık (yeni satır için Enter kullanın)"
              name="heroTitle"
              defaultValue={home.heroTitle}
              rows={2}
            />
            <TextAreaField label="Alt Metin" name="heroSubtitle" defaultValue={home.heroSubtitle} rows={3} />
            <TextField label="Buton Metni" name="heroCtaLabel" defaultValue={home.heroCtaLabel} />
          </FormSection>

          <FormSection title="İstatistikler">
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="grid grid-cols-2 gap-3 rounded-sm border border-ink-border p-4">
                  <TextField
                    label={`Değer ${n}`}
                    name={`stat${n}Value`}
                    defaultValue={home[`stat${n}Value` as keyof typeof home] as string}
                  />
                  <TextField
                    label={`Etiket ${n}`}
                    name={`stat${n}Label`}
                    defaultValue={home[`stat${n}Label` as keyof typeof home] as string}
                  />
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection title="Neden Biz Bölümü">
            <TextField label="Başlık" name="whyUsTitle" defaultValue={home.whyUsTitle} />
            <TextAreaField label="Alt Metin" name="whyUsSubtitle" defaultValue={home.whyUsSubtitle} rows={2} />
            <RepeatingItems name="whyUsItems" initialItems={home.whyUsItems} itemLabel="Madde" />
          </FormSection>
        </ActionForm>
      </div>
    </div>
  );
}
