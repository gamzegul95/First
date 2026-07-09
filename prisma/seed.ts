import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL tanımlı değil. .env dosyanızı kontrol edin.");
}
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  await prisma.lawyerProfile.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      whyUsItems: JSON.stringify([
        {
          title: "Butik ve Özel Yaklaşım",
          description:
            "Her dosyayı sınırlı sayıda vakayla, tam odaklanarak yürütüyor; müvekkillerimize doğrudan avukat erişimi sağlıyoruz.",
        },
        {
          title: "Sektörel Uzmanlık",
          description:
            "Kurumsal hukuktan gayrimenkule, aile hukukundan icra-iflasa uzanan geniş bir uzmanlık yelpazesi sunuyoruz.",
        },
        {
          title: "Şeffaf İletişim",
          description:
            "Dosyanızın her aşamasında düzenli bilgilendirme ve net ücretlendirme ile sürpriz yaşatmıyoruz.",
        },
        {
          title: "Sonuç Odaklı Strateji",
          description:
            "Her uyuşmazlıkta önce çözüm yollarını, ardından en güçlü hukuki stratejiyi birlikte değerlendiriyoruz.",
        },
      ]),
    },
  });

  await prisma.aboutContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      values: JSON.stringify([
        { title: "Dürüstlük", description: "Müvekkillerimize her zaman gerçekçi ve şeffaf hukuki görüş sunarız." },
        { title: "Gizlilik", description: "Her dosya, avukat-müvekkil gizliliği ilkesiyle titizlikle korunur." },
        { title: "Özen", description: "Her uyuşmazlığı, sonucunu doğrudan etkileyen bir titizlikle ele alırız." },
        { title: "Erişilebilirlik", description: "Müvekkillerimiz süreç boyunca ekibimize kolayca ulaşabilir." },
      ]),
    },
  });

  const services = [
    {
      slug: "sirketler-hukuku",
      title: "Şirketler Hukuku",
      summary: "Şirket kuruluşundan birleşme ve devralmalara, kurumsal yönetişime kadar tam kapsamlı danışmanlık.",
      description:
        "Şirket kuruluşu, genel kurul ve yönetim kurulu süreçleri, birleşme-devralma (M&A), ortaklık yapılandırmaları ve kurumsal yönetişim konularında uçtan uca danışmanlık sağlıyoruz. Yerli ve yabancı sermayeli şirketlerin Türkiye'deki faaliyetlerini hukuki risklerden koruyacak şekilde yapılandırıyoruz.",
      icon: "Building2",
      order: 1,
    },
    {
      slug: "ticaret-hukuku",
      title: "Ticaret Hukuku",
      summary: "Ticari sözleşmeler, tahsilat ve ticari uyuşmazlıklarda etkin ve hızlı çözümler.",
      description:
        "Ticari sözleşmelerin hazırlanması ve müzakeresinden, alacak tahsilatı ve ticari uyuşmazlıkların dava ve tahkim yoluyla çözümüne kadar geniş bir hizmet yelpazesi sunuyoruz. Amacımız, ticari faaliyetlerinizin hukuki zeminini sağlamlaştırmaktır.",
      icon: "Handshake",
      order: 2,
    },
    {
      slug: "aile-hukuku",
      title: "Aile Hukuku",
      summary: "Boşanma, nafaka, velayet ve mal paylaşımı süreçlerinde hassasiyetle yürütülen danışmanlık.",
      description:
        "Boşanma davaları, anlaşmalı boşanma protokolleri, nafaka, velayet ve mal rejimi uyuşmazlıklarında müvekkillerimizin haklarını gizlilik ve hassasiyet ilkesiyle koruyoruz.",
      icon: "Users",
      order: 3,
    },
    {
      slug: "miras-hukuku",
      title: "Miras Hukuku",
      summary: "Veraset işlemlerinden miras paylaşımına, vasiyetname düzenlemelerine kapsamlı danışmanlık.",
      description:
        "Mirasçılık belgesi (veraset ilamı) alınması, miras paylaşımı ve ortaklığın giderilmesi davaları, tenkis ve muris muvazaası uyuşmazlıkları ile vasiyetname ve miras sözleşmesi düzenlenmesi konularında müvekkillerimize danışmanlık ve dava takibi hizmeti sunuyoruz.",
      icon: "FileText",
      order: 4,
    },
    {
      slug: "gayrimenkul-hukuku",
      title: "Gayrimenkul Hukuku",
      summary: "Alım-satımdan kentsel dönüşüme, kira uyuşmazlıklarından imar sorunlarına kapsamlı destek.",
      description:
        "Gayrimenkul alım-satım süreçleri, tapu işlemleri, kentsel dönüşüm, kira sözleşmeleri ve tahliye davaları ile imar hukukundan doğan uyuşmazlıklarda müvekkillerimizi temsil ediyoruz.",
      icon: "Landmark",
      order: 5,
    },
    {
      slug: "is-hukuku",
      title: "İş Hukuku",
      summary: "İşe iade, kıdem-ihbar tazminatı ve toplu iş uyuşmazlıklarında işveren ve çalışan temsili.",
      description:
        "İş sözleşmelerinin hazırlanması, işe iade davaları, kıdem ve ihbar tazminatı uyuşmazlıkları ile toplu iş hukukundan doğan ihtilaflarda hem işveren hem çalışan tarafında danışmanlık ve dava takibi yürütüyoruz.",
      icon: "Briefcase",
      order: 6,
    },
    {
      slug: "icra-iflas-hukuku",
      title: "İcra ve İflas Hukuku",
      summary: "Alacak takibinden yapılandırmaya, icra takiplerinin etkin ve hızlı yönetimi.",
      description:
        "Alacaklı ve borçlu vekilliği, icra takiplerinin başlatılması ve yönetimi, haciz işlemleri ile iflas ve konkordato süreçlerinde stratejik danışmanlık sunuyoruz.",
      icon: "Gavel",
      order: 7,
    },
    {
      slug: "fikri-ve-sinai-haklar-hukuku",
      title: "Fikri ve Sınai Haklar Hukuku",
      summary: "Marka, patent ve telif haklarının korunmasından ihlal davalarına uzman danışmanlık.",
      description:
        "Marka ve patent tescil süreçleri, lisans sözleşmeleri, haksız rekabet ve telif hakkı ihlallerine karşı açılan davalar ile fikri mülkiyet varlıklarının korunmasına yönelik danışmanlık hizmeti sunuyoruz.",
      icon: "Lightbulb",
      order: 8,
    },
    {
      slug: "alternatif-uyusmazlik-cozum-yollari",
      title: "Alternatif Uyuşmazlık Çözüm Yolları",
      summary: "Arabuluculuk ve tahkim yoluyla, dava açmadan hızlı ve kalıcı çözümler.",
      description:
        "Uzman arabulucu kimliğimizle, iş, ticaret ve fikri-sınai haklar uyuşmazlıklarında dava yoluna başvurulmadan önce tarafların menfaatini gözeten, hızlı ve kalıcı çözümler üretiyoruz. Arabuluculuk ve tahkim süreçlerini uçtan uca yönetiyoruz.",
      icon: "ShieldCheck",
      order: 9,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  const articles = [
    {
      slug: "kira-sozlesmelerinde-2026-yasal-degisiklikler",
      title: "Kira Sözleşmelerinde 2026 Yılı Yasal Değişiklikleri",
      summary:
        "Kira artış oranları ve tahliye süreçlerinde yürürlüğe giren güncel düzenlemeleri ve kiracı-kiraya veren haklarına etkilerini derledik.",
      content:
        "Kira sözleşmelerine ilişkin mevzuatta yapılan güncellemeler, hem kiracıları hem de mülk sahiplerini yakından ilgilendiriyor. Bu yazıda güncel kira artış oranlarını, tahliye taahhütnamelerinin geçerlilik şartlarını ve kira uyuşmazlıklarında izlenebilecek yasal yolları ele alıyoruz.\nKira artışına ilişkin uyuşmazlıklarda arabuluculuk süreci artık dava şartı olarak öngörülmektedir. Bu durum, tarafların mahkemeye başvurmadan önce anlaşma zemini aramasını zorunlu kılmaktadır.\nMülk sahiplerinin tahliye talepleriyle ilgili olarak, tahliye taahhütnamesinin tarih ve imza şartlarına dikkat edilmesi, ileride doğabilecek hak kayıplarının önüne geçilmesi açısından büyük önem taşımaktadır.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop",
      order: 1,
    },
    {
      slug: "sirketlerde-kurumsal-yonetisim-ve-yonetim-kurulu-sorumlulugu",
      title: "Şirketlerde Kurumsal Yönetişim ve Yönetim Kurulu Sorumluluğu",
      summary:
        "Yönetim kurulu üyelerinin hukuki sorumluluğu ve kurumsal yönetişim ilkelerinin şirketler için taşıdığı önemi inceliyoruz.",
      content:
        "Kurumsal yönetişim, yalnızca büyük ölçekli şirketler için değil, büyümeyi hedefleyen her işletme için sürdürülebilir başarının temel taşlarından biridir. Yönetim kurulu üyelerinin özen ve bağlılık yükümlülükleri, alınan kararların şirket menfaatine uygunluğu açısından belirleyicidir.\nTürk Ticaret Kanunu kapsamında yönetim kurulu üyelerinin sorumluluğu, kusur esasına dayanmakta olup, üyelerin görevlerini gereği gibi yerine getirmemesi durumunda şirkete, pay sahiplerine ve alacaklılara karşı sorumluluk doğabilmektedir.\nBu nedenle şirketlerin, yönetim kurulu karar süreçlerini şeffaf, belgelenebilir ve denetlenebilir şekilde yürütmesi, olası uyuşmazlıklarda önemli bir savunma zemini oluşturmaktadır.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=800&fit=crop",
      order: 2,
    },
    {
      slug: "bosanma-davalarinda-mal-paylasimi-nasil-yapilir",
      title: "Boşanma Davalarında Mal Paylaşımı Nasıl Yapılır?",
      summary:
        "Edinilmiş mallara katılma rejimi çerçevesinde mal paylaşımının nasıl hesaplandığını ve sıkça karşılaşılan sorunları açıklıyoruz.",
      content:
        "Türk Medeni Kanunu'nda kural olarak edinilmiş mallara katılma rejimi geçerlidir. Bu rejime göre, evlilik birliği içinde edinilen mallar, boşanma halinde eşler arasında belirli oranlarda paylaştırılır.\nMal paylaşımı davalarında en çok karşılaşılan sorunlardan biri, malın 'kişisel mal' mı yoksa 'edinilmiş mal' mı olduğunun tespitidir. Miras veya bağış yoluyla edinilen mallar kişisel mal sayılırken, evlilik süresince elde edilen gelirle alınan mallar edinilmiş mal kapsamındadır.\nSürecin doğru yönetilmesi, tarafların maddi haklarının korunması açısından kritik önem taşımaktadır; bu nedenle mal rejimi tasfiyesi davalarında uzman bir hukuki destek alınması önerilmektedir.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=800&fit=crop",
      order: 3,
    },
    {
      slug: "is-sozlesmesi-fesihlerinde-dikkat-edilmesi-gerekenler",
      title: "İş Sözleşmelerinin Feshinde Dikkat Edilmesi Gereken Hususlar",
      summary:
        "İşveren ve çalışan açısından iş sözleşmesi fesihlerinde usul ve esasa ilişkin en kritik noktaları özetliyoruz.",
      content:
        "İş sözleşmesinin feshi, gerek işveren gerek çalışan açısından hukuki sonuçları ağır olabilen bir süreçtir. Fesih bildiriminin yazılı yapılması, gerekçelerin açık biçimde belirtilmesi ve yasal bildirim sürelerine uyulması, olası işe iade davalarında belirleyici rol oynamaktadır.\nİşe iade davalarında, feshin geçerli bir nedene dayanıp dayanmadığı titizlikle incelenmektedir. İşverenin fesih öncesinde savunma alma yükümlülüğünü yerine getirmemesi, tek başına feshi geçersiz kılabilecek bir usul hatası olarak değerlendirilebilir.\nKıdem ve ihbar tazminatı hesaplamalarında, çalışanın gerçek hizmet süresi ve son brüt ücreti esas alınmaktadır; bu kalemlerin eksik veya hatalı hesaplanması, ileride ek tazminat taleplerine yol açabilmektedir.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop",
      order: 4,
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
