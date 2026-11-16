/**
 * Image pipeline — run after adding/replacing photos:   npm run images
 *
 * Every JPG/PNG in public/images (except /opt) and src/assets/gallery gets responsive WebP copies
 * (480 / 960 / 1600 px wide) in public/images/opt/, plus an entry in src/data/image-manifest.json
 * with its real size and a tiny blurred preview. The <Img> component uses the manifest to load the
 * right size for each screen and show a blur-up placeholder. Originals are never modified.
 *
 * Manifest keys: public files by URL ("/images/1.jpeg"), gallery files as "gallery/<file>".
 */
import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import { join, relative, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(ROOT, 'public')
const OUT = join(PUBLIC, 'images', 'opt')
const GALLERY = join(ROOT, 'src', 'assets', 'gallery')
const WIDTHS = [480, 960, 1600]
const LOGO_WIDTHS = [128, 256] // the logo is only ever shown small (≤ 64 px)
const QUALITY = 74

async function walk(dir) {
  const out = []
  let entries = []
  try { entries = await readdir(dir, { withFileTypes: true }) } catch { return out }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) { if (p !== OUT) out.push(...(await walk(p))) }
    else if (/\.(jpe?g|png)$/i.test(e.name) && !e.name.startsWith('._')) out.push(p)
  }
  return out
}

const jobs = [
  ...(await walk(join(PUBLIC, 'images'))).map((src) => {
    const rel = relative(PUBLIC, src).split('\\').join('/') // images/x.jpg
    return { src, key: '/' + rel, base: rel.replace(/^images\//, '').replace(extname(rel), '') }
  }),
  ...(await walk(GALLERY)).map((src) => {
    const rel = relative(GALLERY, src).split('\\').join('/')
    return { src, key: 'gallery/' + rel, base: 'gallery/' + rel.replace(extname(rel), '') }
  }),
].sort((a, b) => a.key.localeCompare(b.key))

const manifest = {}
for (const { src, key, base } of jobs) {
  const srcTime = (await stat(src)).mtimeMs
  const meta = await sharp(src).metadata()
  const [width, height] = (meta.orientation ?? 1) >= 5 ? [meta.height, meta.width] : [meta.width, meta.height]
  const W = /logo/i.test(key) ? LOGO_WIDTHS : WIDTHS
  const widths = [...new Set([...W.filter((w) => w < width), Math.min(width, W.at(-1))])].sort((a, b) => a - b)
  for (const w of widths) {
    const dest = join(OUT, `${base}-${w}.webp`)
    await mkdir(dirname(dest), { recursive: true })
    const fresh = await stat(dest).then((d) => d.mtimeMs >= srcTime).catch(() => false)
    if (!fresh || process.argv.includes('--force'))
      await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(dest)
  }
  const lqip = await sharp(src).rotate().resize({ width: 24 }).blur(0.6).webp({ quality: 40 }).toBuffer()
  manifest[key] = { w: width, h: height, v: widths, base: `/images/opt/${base}`, lqip: `data:image/webp;base64,${lqip.toString('base64')}` }
}
await mkdir(join(ROOT, 'src', 'data'), { recursive: true })
await writeFile(join(ROOT, 'src', 'data', 'image-manifest.json'), JSON.stringify(manifest) + '\n')
console.log(`Optimised ${jobs.length} images → public/images/opt (manifest: src/data/image-manifest.json)`)
