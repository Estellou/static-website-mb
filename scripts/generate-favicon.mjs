import sharp from 'sharp'

const SIZE = 64
const PADDING = 4
const INNER = SIZE - PADDING * 2

// Circular mask — white filled circle, transparent outside
const circleMask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}">
    <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="white"/>
  </svg>`
)

await sharp('./app/images/logo2.png')
  // Fit logo inside circle area with white background
  .resize(INNER, INNER, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  // Add padding to reach full SIZE
  .extend({
    top: PADDING,
    bottom: PADDING,
    left: PADDING,
    right: PADDING,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  // Clip to circle (dest-in keeps only pixels inside the mask)
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toFile('./public/favicon.png')

console.log('favicon.png generated in public/')
