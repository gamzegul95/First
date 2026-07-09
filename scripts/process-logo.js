const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'public', 'logo-source.jpg');
const OUT = (name) => path.join(__dirname, '..', 'public', name);

// Key out near-black background, keep gold pixels opaque, based on luminance.
async function keyToTransparent(inputBuffer) {
  const img = sharp(inputBuffer).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    // background is pure black; alpha scales with brightness
    const alpha = Math.max(0, Math.min(255, Math.round((lum / 60) * 255)));
    data[i + 3] = alpha;
  }
  return sharp(data, { raw: { width, height, channels } }).png();
}

async function alphaBoundingBoxTrim(sharpInstance, padding = 12) {
  const { data, info } = await sharpInstance.clone().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * channels + 3];
      if (a > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(width - 1, maxX + padding);
  maxY = Math.min(height - 1, maxY + padding);
  return sharpInstance.clone().extract({
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  });
}

async function main() {
  const srcMeta = await sharp(SRC).metadata();
  const inset = 4;
  const fullBuf = await sharp(SRC)
    .extract({ left: inset, top: inset, width: srcMeta.width - inset * 2, height: srcMeta.height - inset * 2 })
    .toBuffer();

  // Full lockup (mark + wordmark), transparent bg, trimmed
  const fullKeyed = await keyToTransparent(fullBuf);
  const fullTrimmed = await alphaBoundingBoxTrim(fullKeyed);
  await fullTrimmed.png().toFile(OUT('logo-full.png'));

  // Mark only: crop top ~58% (above the wordmark) then key + trim
  const markCropHeight = Math.round((srcMeta.height - inset * 2) * 0.58);
  const markCropped = await sharp(fullBuf)
    .extract({ left: 0, top: 0, width: srcMeta.width - inset * 2, height: markCropHeight })
    .toBuffer();
  const markKeyed = await keyToTransparent(markCropped);
  const markTrimmed = await alphaBoundingBoxTrim(markKeyed);
  await markTrimmed.png().toFile(OUT('logo-mark.png'));

  // Favicon-ready square PNGs (mark on transparent, padded to square, sized)
  const markTrimmedBuf = await markTrimmed.png().toBuffer();
  for (const size of [32, 192, 512]) {
    await sharp(markTrimmedBuf)
      .resize(Math.round(size * 0.82), Math.round(size * 0.82), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: Math.round(size * 0.09), bottom: Math.round(size * 0.09),
        left: Math.round(size * 0.09), right: Math.round(size * 0.09),
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .resize(size, size)
      .toFile(OUT(`icon-${size}.png`));
  }

  console.log('done');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
