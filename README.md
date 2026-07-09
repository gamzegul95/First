# Akkaya Hukuk & Danışmanlık

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion ile
geliştirilmiş, koyu/altın temalı premium hukuk bürosu web sitesi. İçerikler
Prisma üzerinden bir veritabanında tutulur ve `/admin` altındaki yönetim
panelinden düzenlenebilir.

## Geliştirme

```bash
npm install
npm run db:migrate   # veritabanı şemasını oluşturur (ilk kurulumda)
npm run db:seed      # örnek/placeholder içerikleri yükler (ilk kurulumda)
npm run dev
```

Site: http://localhost:3000
Admin panel: http://localhost:3000/admin

## Admin panel girişi

Varsayılan giriş bilgileri (`.env` dosyasında tanımlı):

- Kullanıcı adı: `admin`
- Şifre: `AkkayaHukuk2026!`

**Canlıya almadan önce mutlaka değiştirin:**

```bash
npm run admin:set-password -- "yeni-guclu-sifreniz"
```

Komut size yeni bir `ADMIN_PASSWORD_HASH` değeri verecektir; bunu `.env`
dosyasındaki mevcut değerle değiştirin (dolar işaretlerinin `\$` olarak
kaçışlı kalmasına dikkat edin, aksi halde ortam değişkeni yükleyicisi hash'i
bozar).

## İçerik yönetimi

Admin panelinden şunlar düzenlenebilir:

- Site ayarları (firma adı, iletişim bilgileri, sosyal medya)
- Ana sayfa (hero, istatistikler, "Neden Biz" bölümü)
- Hakkımızda (hikaye, misyon/vizyon, değerler)
- Avukat profili (biyografi, uzmanlık alanları, eğitimler)
- Çalışma alanları (ekle/düzenle/sil)
- Makaleler (ekle/düzenle/sil)
- İletişim formundan gelen mesajlar

## Veritabanı

Geliştirme ortamında SQLite (`dev.db`) kullanılır. Canlı ortamda (ör. Vercel)
kalıcı disk olmadığından bir bulut Postgres'e (Neon, Supabase, Vercel
Postgres) geçmeniz gerekir:

1. `prisma/schema.prisma` içinde `datasource db` bloğunun `provider` değerini
   `"postgresql"` yapın.
2. `@prisma/adapter-libsql` yerine `@prisma/adapter-pg` (veya kullandığınız
   sağlayıcının adaptörünü) kurup `src/lib/prisma.ts` içindeki adapter
   kurulumunu güncelleyin.
3. `DATABASE_URL` ortam değişkenini yeni bağlantı dizesiyle güncelleyin.
4. `npx prisma migrate deploy` çalıştırın.
5. `npm run db:seed` ile başlangıç içeriğini yükleyin (opsiyonel).

## Logo / marka varlıkları

Orijinal logo `public/logo-source.jpg` içinde saklanır.
`scripts/process-logo.js` bu görseli işleyerek şeffaf arka planlı
`public/logo-mark.png` (amblem) ve `public/logo-full.png` (amblem + yazı)
dosyalarını ile favicon boyutlarını (`public/icon-*.png`) üretir. Logoyu
değiştirmek isterseniz `logo-source.jpg` dosyasını yenisiyle değiştirip
`node scripts/process-logo.js` komutunu tekrar çalıştırın.

## Fotoğraflar

Şu an dosya yükleme (upload) altyapısı yoktur; avukat profil fotoğrafı için
admin panelinden bir görsel URL'si girilebilir (harici bir barındırmadan).
Fotoğraf girilmezse zarif bir yer tutucu (silüet) gösterilir.

## SEO

Site; sayfa başına başlık/açıklama, Open Graph & Twitter Card görselleri,
`schema.org` yapılandırılmış verisi (LegalService, Attorney, Article,
BreadcrumbList), dinamik `sitemap.xml` ve `robots.txt` ile donatılmıştır.

**Canlıya almadan önce mutlaka yapılması gerekenler:**

1. `.env` dosyasındaki `NEXT_PUBLIC_SITE_URL` değerini gerçek alan adınızla
   güncelleyin (sonunda `/` olmadan) — sitemap, canonical ve Open Graph
   etiketleri bu değeri kullanır.
2. Siteyi [Google Search Console](https://search.google.com/search-console)'a
   ekleyip `sitemap.xml` adresini gönderin.
3. Bir **Google İşletme Profili** (Google Business Profile) oluşturup adres,
   telefon ve çalışma saatlerini eşleştirin — yerel aramalarda ("Ankara
   avukat" gibi) öne çıkmanın en belirleyici adımı budur ve kod dışında
   ilerleyen bir süreçtir.
4. Gerçek müvekkil yorumları biriktirin; bunlar da yerel arama sıralamasını
   doğrudan etkiler.

Görsel değişirse `node scripts/generate-og-image.js` komutunu tekrar
çalıştırarak `public/og-image.png` dosyasını güncelleyebilirsiniz.
