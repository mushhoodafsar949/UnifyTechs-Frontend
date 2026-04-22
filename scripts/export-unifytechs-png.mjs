import sharp from 'sharp'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const inputs = [
  ['public/brand/unifytechs-mark.svg', 'public/brand/unifytechs-mark.png', 512],
  ['public/brand/unifytechs-logo.svg', 'public/brand/unifytechs-logo.png', 1024],
  ['public/brand/unifytechs-mark.svg', 'public/apple-touch-icon.png', 180],
]

for (const [relIn, relOut, size] of inputs) {
  const input = join(root, relIn)
  const output = join(root, relOut)
  const svg = readFileSync(input)
  await sharp(svg).resize(size, null, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(output)
  console.warn('wrote', relOut)
}
