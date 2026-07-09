import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getSiteSettings } from "@/lib/data";

const description =
  "AKKAYA HUKUK & DANIŞMANLIK web sitesinde kullanılan çerezler ve kişisel verilerin korunmasına ilişkin bilgilendirme.";

export const metadata: Metadata = {
  title: "Gizlilik ve Çerez Politikası",
  description,
  alternates: { canonical: "/gizlilik-ve-cerez-politikasi" },
  openGraph: { title: "Gizlilik ve Çerez Politikası", description, url: "/gizlilik-ve-cerez-politikasi" },
};

export default async function PrivacyCookiePolicyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Gizlilik ve Çerez Politikası", path: "/gizlilik-ve-cerez-politikasi" },
        ])}
      />
      <PageHero
        kicker="Yasal Bilgilendirme"
        title="Gizlilik ve Çerez Politikası"
        description="Web sitemizi ziyaret ettiğinizde işlenen kişisel veriler ve kullanılan çerezler hakkında bilgilendirme."
        crumb="Gizlilik ve Çerez Politikası"
      />

      <section className="relative bg-ink-950 py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed text-stone-400">
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-100">
                1. Çerez Kullanımı
              </h2>
              <p className="mt-4">
                Web sitemiz, ziyaretçilerine daha iyi bir deneyim sunabilmek
                amacıyla sınırlı sayıda çerez kullanır. Şu anda sitemizde
                yalnızca teknik olarak zorunlu bir çerez bulunmaktadır: bu
                çerez, yalnızca yönetim paneline giriş yapan yetkili
                kullanıcının oturumunu güvenli şekilde yönetmek için
                kullanılır ve ziyaretçi davranışını izlemez, üçüncü taraflarla
                paylaşılmaz. Sitemizde şu an reklam, analiz veya pazarlama
                amaçlı üçüncü taraf çerezleri kullanılmamaktadır.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-stone-100">
                2. Kişisel Verilerin Korunması (KVKK)
              </h2>
              <p className="mt-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
                kapsamında, iletişim formu aracılığıyla bizimle paylaştığınız
                ad, e-posta, telefon numarası ve mesaj içeriği gibi kişisel
                veriler, yalnızca talebinizin değerlendirilmesi ve sizinle
                iletişime geçilmesi amacıyla işlenir ve saklanır. Verileriniz,
                yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-stone-100">
                3. Haklarınız
              </h2>
              <p className="mt-4">
                KVKK&apos;nın 11. maddesi uyarınca kişisel verilerinizin
                işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi
                talep etme, işlenme amacını ve amacına uygun kullanılıp
                kullanılmadığını öğrenme, eksik veya yanlış işlenmişse
                düzeltilmesini isteme ve mevzuatta öngörülen şartlar
                çerçevesinde silinmesini talep etme haklarına sahipsiniz. Bu
                haklarınızı kullanmak için{" "}
                <a
                  href={`mailto:${settings.email}`}
                  className="text-gold-400 underline underline-offset-2 hover:text-gold-300"
                >
                  {settings.email}
                </a>{" "}
                adresinden bizimle iletişime geçebilirsiniz.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-stone-100">
                4. Politika Güncellemeleri
              </h2>
              <p className="mt-4">
                Bu politika, yasal düzenlemelerdeki değişiklikler veya
                sitemizde sunulan hizmetlerdeki güncellemeler doğrultusunda
                zaman zaman revize edilebilir. Güncel sürüm her zaman bu
                sayfada yayınlanır.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
