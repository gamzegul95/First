-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "firmName" TEXT NOT NULL DEFAULT 'AKKAYA HUKUK & DANIŞMANLIK',
    "tagline" TEXT NOT NULL DEFAULT 'Güven ve Uzmanlıkla Yanınızdayız',
    "metaDescription" TEXT NOT NULL DEFAULT 'Ankara merkezli AKKAYA HUKUK & DANIŞMANLIK; kurumsal, ticari ve bireysel hukuki danışmanlık hizmetleri sunar.',
    "phone" TEXT NOT NULL DEFAULT '+90 541 465 46 77',
    "whatsapp" TEXT NOT NULL DEFAULT '+90 532 000 00 00',
    "email" TEXT NOT NULL DEFAULT 'info@akkayahukukdanismanlik.com',
    "address" TEXT NOT NULL DEFAULT 'Korkutreis Mah. İlkiz Sok. No:18/16 Kat:4 Çankaya/Ankara',
    "workingHours" TEXT NOT NULL DEFAULT 'Pazartesi - Cuma: 09:00 - 18:30',
    "mapEmbedUrl" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeContent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heroKicker" TEXT NOT NULL DEFAULT 'AKKAYA HUKUK & DANIŞMANLIK',
    "heroTitle" TEXT NOT NULL DEFAULT 'Her Dosyada Strateji,
Her Süreçte Güven',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Bireysel ve kurumsal müvekkillerimize güvenilir, çözüm odaklı ve etkin hukuki hizmet sunuyoruz.',
    "heroCtaLabel" TEXT NOT NULL DEFAULT 'Bize Ulaşın',
    "stat1Value" TEXT NOT NULL DEFAULT '8+',
    "stat1Label" TEXT NOT NULL DEFAULT 'Yıllık Deneyim',
    "stat2Value" TEXT NOT NULL DEFAULT '1200+',
    "stat2Label" TEXT NOT NULL DEFAULT 'Sonuçlanan Dava',
    "stat3Value" TEXT NOT NULL DEFAULT '%95',
    "stat3Label" TEXT NOT NULL DEFAULT 'Müvekkil Memnuniyeti',
    "stat4Value" TEXT NOT NULL DEFAULT '7/24',
    "stat4Label" TEXT NOT NULL DEFAULT 'Danışmanlık Erişimi',
    "whyUsTitle" TEXT NOT NULL DEFAULT 'Neden Akkaya Hukuk?',
    "whyUsSubtitle" TEXT NOT NULL DEFAULT 'Her dosyaya butik bir yaklaşım, her müvekkile stratejik bir ortaklık sunuyoruz.',
    "whyUsItems" TEXT NOT NULL DEFAULT '[]',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "kicker" TEXT NOT NULL DEFAULT 'Hakkımızda',
    "title" TEXT NOT NULL DEFAULT 'Güven ve Çözüm Odaklı Bir Hukuk Anlayışı',
    "intro" TEXT NOT NULL DEFAULT 'AKKAYA HUKUK & DANIŞMANLIK, bireysel ve kurumsal müvekkillerine güvenilir, çözüm odaklı ve etkin hukuki hizmet sunmak amacıyla kurulmuştur. Hukukun üstünlüğü, meslek etiği, dürüstlük ve şeffaflık ilkelerini esas alan büromuz; her uyuşmazlığı kendi özel koşulları içerisinde değerlendirerek müvekkillerine en doğru hukuki çözümleri sunmayı hedeflemektedir.',
    "storyTitle" TEXT NOT NULL DEFAULT 'Çalışma Anlayışımız',
    "storyBody" TEXT NOT NULL DEFAULT 'Faaliyet alanlarımız arasında Miras Hukuku, Aile Hukuku, İş Hukuku, Ticaret Hukuku, Gayrimenkul Hukuku, İcra ve İflas Hukuku, Fikri ve Sınai Haklar Hukuku başta olmak üzere; dava takibi, hukuki danışmanlık, sözleşme hazırlama ve inceleme, icra işlemleri ve alternatif uyuşmazlık çözüm yöntemleri yer almaktadır.
Büromuz, yalnızca ortaya çıkan hukuki uyuşmazlıkların çözümüne değil, aynı zamanda olası hukuki risklerin önceden tespit edilerek önlenmesine de önem vermektedir. Bu anlayış doğrultusunda müvekkillerimize hızlı, ulaşılabilir ve sürdürülebilir hukuki destek sunuyor; her aşamada şeffaf iletişim ve güven esasına dayalı bir çalışma ilişkisi kurmayı amaçlıyoruz.',
    "missionTitle" TEXT NOT NULL DEFAULT 'Misyonumuz',
    "missionBody" TEXT NOT NULL DEFAULT 'Müvekkillerimizin haklarını en üst düzeyde koruyarak, şeffaf ve stratejik bir hukuki danışmanlık deneyimi sunmak.',
    "visionTitle" TEXT NOT NULL DEFAULT 'Vizyonumuz',
    "visionBody" TEXT NOT NULL DEFAULT 'Müvekkillerimize her aşamada ulaşılabilir, şeffaf ve sürdürülebilir bir hukuki destek sunmaya devam etmek.',
    "values" TEXT NOT NULL DEFAULT '[]',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LawyerProfile" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL DEFAULT 'Av. Arb. Gamze Gül Akkaya',
    "title" TEXT NOT NULL DEFAULT 'Avukat',
    "photoUrl" TEXT,
    "bio" TEXT NOT NULL DEFAULT 'Av. Arb. Gamze Gül Akkaya, 2017 yılında İstanbul Üniversitesi Hukuk Fakültesi''nden mezun olmuş, 2018 yılında avukatlık ruhsatını alarak mesleki hayatına başlamıştır.
Meslek hayatına İstanbul''da başlayan Av. Gamze Gül Akkaya, edindiği mesleki tecrübeyi bugün Ankara''da kurucusu olduğu AKKAYA HUKUK & DANIŞMANLIK bünyesinde sürdürmektedir.
Avukatlık mesleğini icra ettiği süre boyunca gerçek ve tüzel kişilere hukuki danışmanlık, dava takibi ve uyuşmazlık çözümü alanlarında hizmet vermiş; özellikle Miras Hukuku, Aile Hukuku, İş Hukuku, Ticaret Hukuku, Gayrimenkul Hukuku, İcra ve İflas Hukuku, Fikri ve Sınai Haklar Hukuku alanlarında yoğunlaşmıştır.
Bunun yanında, İş Hukuku, Ticaret Hukuku ve Fikri ve Sınai Haklar Hukuku Uzman Arabulucu olarak faaliyet göstermekte; uyuşmazlıkların dava yoluna başvurulmadan, hızlı, etkin ve kalıcı çözümlerle sonuçlandırılmasına katkı sağlamaktadır. Arabuluculuk süreçlerinde tarafların menfaatlerini gözeten, iletişimi güçlendiren ve sürdürülebilir çözümler üreten bir yaklaşım benimsemektedir.
Her hukuki uyuşmazlığın kendine özgü dinamiklere sahip olduğu bilinciyle hareket eden Av. Gamze Gül Akkaya, müvekkilleriyle güvene dayalı, şeffaf ve ulaşılabilir bir iletişim kurmayı temel ilke olarak benimsemektedir. Güncel mevzuat, yüksek yargı kararları ve doktrindeki gelişmeleri yakından takip ederek hukuki hizmetlerini sürekli geliştirmekte; her dosyada titiz, özenli ve sonuç odaklı bir çalışma anlayışıyla hareket etmektedir.',
    "languages" TEXT NOT NULL DEFAULT 'Türkçe, İngilizce',
    "specializations" TEXT NOT NULL DEFAULT '["Miras Hukuku","Aile Hukuku","İş Hukuku","Ticaret Hukuku","Gayrimenkul Hukuku","İcra ve İflas Hukuku","Fikri ve Sınai Haklar Hukuku"]',
    "certifications" TEXT NOT NULL DEFAULT '["İş Hukuku Uzman Arabuluculuk Eğitimi","Ticaret Hukuku Uzman Arabuluculuk Eğitimi","Fikri ve Sınai Haklar Hukuku Uzman Arabuluculuk Eğitimi"]',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LawyerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'Scale',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
