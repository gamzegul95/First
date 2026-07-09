import { getLawyerProfile } from "@/lib/data";
import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ActionForm from "@/components/admin/ActionForm";
import { updateLawyerProfile } from "./actions";

export default async function LawyerProfilePage() {
  const lawyer = await getLawyerProfile();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-50">Avukat Profili</h1>
      <p className="mt-1 text-sm text-stone-400">
        Hakkımızda sayfasından erişilen kurucu avukat profil sayfasının içeriğini düzenleyin.
      </p>

      <div className="mt-8">
        <ActionForm action={updateLawyerProfile}>
          <FormSection title="Genel Bilgiler">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Ad Soyad" name="name" defaultValue={lawyer.name} required />
              <TextField label="Unvan" name="title" defaultValue={lawyer.title} required />
            </div>
            <ImageUploadField
              label="Fotoğraf (opsiyonel)"
              name="photoUrl"
              defaultValue={lawyer.photoUrl}
            />
            <TextField label="Diller" name="languages" defaultValue={lawyer.languages} placeholder="Türkçe, İngilizce" />
          </FormSection>

          <FormSection title="Biyografi" description="Her paragraf için yeni bir satır bırakın.">
            <TextAreaField label="Biyografi Metni" name="bio" defaultValue={lawyer.bio} rows={12} required />
          </FormSection>

          <FormSection title="Uzmanlık ve Eğitimler" description="Her madde için ayrı bir satır kullanın.">
            <TextAreaField
              label="Uzmanlık Alanları"
              name="specializations"
              defaultValue={lawyer.specializations.join("\n")}
              rows={7}
            />
            <TextAreaField
              label="Eğitimler / Sertifikalar"
              name="certifications"
              defaultValue={lawyer.certifications.join("\n")}
              rows={4}
            />
          </FormSection>
        </ActionForm>
      </div>
    </div>
  );
}
