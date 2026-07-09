const sharp = require("sharp");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "og-image.png");
const LOGO = path.join(__dirname, "..", "public", "logo-full.png");

const WIDTH = 1200;
const HEIGHT = 630;

async function main() {
  const background = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#141414"/>
          <stop offset="55%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#08070a"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stop-color="#c2984f" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#c2984f" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="hairline" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#c2984f" stop-opacity="0"/>
          <stop offset="50%" stop-color="#c2984f" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#c2984f" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
      <rect x="0" y="0" width="${WIDTH}" height="3" fill="url(#hairline)"/>
      <rect x="0" y="${HEIGHT - 3}" width="${WIDTH}" height="3" fill="url(#hairline)"/>
    </svg>
  `);

  const logoResized = await sharp(LOGO)
    .resize({ width: 560, fit: "inside" })
    .toBuffer();
  const logoMeta = await sharp(logoResized).metadata();

  await sharp(background)
    .composite([
      {
        input: logoResized,
        left: Math.round((WIDTH - logoMeta.width) / 2),
        top: Math.round((HEIGHT - logoMeta.height) / 2),
      },
    ])
    .png()
    .toFile(OUT);

  console.log("OG image yazıldı:", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
