import sharp from 'sharp'

const source = 'public/brand/unify-techs-approved-mark.png'

async function makeIcon(size, output) {
  const radius = Math.round(size * 0.22)
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="white"/></svg>`)
  await sharp(source)
    .extract({ left: 140, top: 140, width: 974, height: 974 })
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(output)
}

await Promise.all([
  makeIcon(512, 'public/brand/favicon-512.png'),
  makeIcon(192, 'public/brand/favicon-192.png'),
  makeIcon(32, 'public/brand/favicon-32.png'),
  makeIcon(16, 'public/brand/favicon-16.png'),
  makeIcon(180, 'public/brand/apple-touch-icon.png'),
])
