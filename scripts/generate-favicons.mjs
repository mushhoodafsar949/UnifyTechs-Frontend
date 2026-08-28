import sharp from 'sharp'

// Authoritative master: Unify Techs LinkedIn/brand-assets/unify-techs-logo-main-v4-512x512.png
const source = 'public/brand/unify-techs-mark-latest-source.png'

async function makeIcon(size, output) {
  const radius = Math.round(size * 0.2)
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="white"/></svg>`)
  await sharp(source)
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(output)
}

await Promise.all([
  makeIcon(512, 'public/brand/unify-techs-mark-latest.png'),
  makeIcon(512, 'public/brand/favicon-latest-512.png'),
  makeIcon(192, 'public/brand/favicon-latest-192.png'),
  makeIcon(32, 'public/brand/favicon-latest-32.png'),
  makeIcon(16, 'public/brand/favicon-latest-16.png'),
  makeIcon(180, 'public/brand/apple-touch-icon-latest.png'),
])
