/**
 * Genera public/og-image.png (1200x630) y public/apple-touch-icon.png (180x180)
 * a partir de SVG, usando sharp (ya incluido con Astro).
 * Uso: npm run og
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const name = 'Andrés Cantuña';
const title = 'Ingeniero de Software · Full Stack';
const tagline = 'La innovación ya no es una opción, es nuestra realidad.';
const stack = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Laravel', 'PostgreSQL', 'Docker'];

let x = 80;
const badges = stack
  .map((t) => {
    const w = t.length * 13 + 32;
    const svg = `<g transform="translate(${x},470)"><rect width="${w}" height="44" rx="10" fill="#18181b" stroke="#3f3f46"/><text x="${w / 2}" y="29" text-anchor="middle" font-family="monospace" font-size="20" fill="#d4d4d8">${t}</text></g>`;
    x += w + 12;
    return svg;
  })
  .join('');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
    </pattern>
    <radialGradient id="glow" cx="80%" cy="0%" r="70%">
      <stop offset="0" stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090b"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80,80)">
    <rect width="64" height="64" rx="14" fill="#18181b" stroke="#3f3f46"/>
    <path d="M18 22l10 10-10 10" fill="none" stroke="#34d399" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M33 44h13" fill="none" stroke="#fafafa" stroke-width="5" stroke-linecap="round"/>
  </g>
  <text x="166" y="122" font-family="monospace" font-size="24" fill="#34d399">~/andres-cantuna</text>
  <text x="80" y="268" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="78" font-weight="700" fill="#fafafa">${name}</text>
  <text x="80" y="330" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="36" font-weight="500" fill="#a1a1aa">${title}</text>
  <text x="80" y="400" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="28" fill="#6ee7b7">${tagline}</text>
  ${badges}
  <text x="1120" y="580" text-anchor="end" font-family="monospace" font-size="20" fill="#71717a">Quito, Ecuador</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-image.png');

const favicon = await readFile('public/favicon.svg');
await sharp(favicon, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');

console.log('✔ public/og-image.png y public/apple-touch-icon.png generados');
