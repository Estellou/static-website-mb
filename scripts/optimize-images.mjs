import sharp from 'sharp'
import { unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const dir = join(dirname(fileURLToPath(import.meta.url)), '../app/images')

const images = [
  { src: 'atelier.PNG',       dest: 'atelier.webp',       width: 900 },
  { src: 'portrait.jpeg',     dest: 'portrait.webp',      width: 900 },
  { src: 'chambreCarre.PNG',  dest: 'chambreCarre.webp',  width: 600 },
  { src: 'cuisineMeuble.JPG', dest: 'cuisineMeuble.webp', width: 600 },
  { src: 'dressing.PNG',      dest: 'dressing.webp',      width: 600 },
  { src: 'salle2bain.PNG',    dest: 'salle2bain.webp',    width: 600 },
]

for (const { src, dest, width } of images) {
  await sharp(join(dir, src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(dir, dest))

  unlinkSync(join(dir, src))
  console.log(`✓  ${src} → ${dest}`)
}
