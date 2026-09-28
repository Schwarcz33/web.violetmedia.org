import { mkdir, readdir, copyFile, unlink } from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('public/media', { recursive: true });
for (const file of await readdir('public/media')) {
  if (file.endsWith('.webp')) await unlink(`public/media/${file}`);
}
for (const source of ['assets/photography-2026-09-28', 'assets/gym-reference-revision-2026-09-28', 'assets/gym-second-rack-2026-09-28']) {
  for (const file of await readdir(source)) {
    if (!/\.webp$/i.test(file)) continue;
    if (source.includes('gym-reference-revision-') && file === 'standard-gallery-1.webp') continue;
    if (source.includes('photography-') && file.startsWith('standard-')) continue;
    const name = file.replace(/\.webp$/i, '');
    for (const width of [640, 1280]) {
      await sharp(`${source}/${file}`).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/media/${name}-${width}.webp`);
    }
  }
}
await copyFile('favicon.ico', 'public/favicon.ico');
for (const name of ['noir-hero-1080.mp4', 'noir-hero-720.mp4']) {
  await copyFile(`assets/premium-motion-2026-09-28/${name}`, `public/media/${name}`);
}
await sharp('vm-icon.png').resize({width:96}).webp({quality:85}).toFile('public/media/violet-mark.webp');
console.log('Prepared responsive WebP images from the new September 2026 collection.');
