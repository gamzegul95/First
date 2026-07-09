import { getSiteSettings } from "@/lib/data";
import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import ActionForm from "@/components/admin/ActionForm";
import { updateSiteSettings } from "./actions";

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-50">Site Ayarları</h1>
      <p className="mt-1 text-sm text-stone-400">
        Firma bilgileri ve iletişim detaylarını buradan güncelleyin.
      </p>

      <div className="mt-8">
        <ActionForm action={updateSiteSettings}>
          <FormSection title="Genel Bilgiler">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Firma Adı" name="firmName" defaultValue={settings.firmName} required />
              <TextField label="Slogan" name="tagline" defaultValue={settings.tagline} required />
            </div>
            <TextAreaField
              label="Meta Açıklama (SEO)"
              name="metaDescription"
              defaultValue={settings.metaDescription}
              rows={3}
            />
          </FormSection>

          <FormSection title="İletişim Bilgileri">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Telefon" name="phone" defaultValue={settings.phone} required />
              <TextField label="WhatsApp" name="whatsapp" defaultValue={settings.whatsapp} />
              <TextField label="E-posta" name="email" type="email" defaultValue={settings.email} required />
              <TextField label="Çalışma Saatleri" name="workingHours" defaultValue={settings.workingHours} />
            </div>
            <TextAreaField label="Adres" name="address" defaultValue={settings.address} rows={2} />
            <TextField
              label="Google Maps Embed URL (opsiyonel)"
              name="mapEmbedUrl"
              defaultValue={settings.mapEmbedUrl}
              placeholder="https://www.google.com/maps/embed?..."
            />
          </FormSection>

          <FormSection title="Sosyal Medya">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Instagram URL" name="instagram" defaultValue={settings.instagram} />
              <TextField label="LinkedIn URL" name="linkedin" defaultValue={settings.linkedin} />
            </div>
          </FormSection>
        </ActionForm>
      </div>
    </div>
  );
}
