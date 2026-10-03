import {
  siDocker,
  siGit,
  siSvelte,
  siTailwindcss,
  siLaravel,
  siCodeigniter,
  siJquery,
  siBootstrap,
  siOpenjdk,
  siAndroid,
} from 'simple-icons'

// Ikon dibundel langsung (tanpa CDN). `color` menimpa warna merek jika terlalu gelap.
const icon = (i, color) => ({ name: i.title, path: i.path, color: color ?? `#${i.hex}` })

export const stack = [
  icon(siGit),
  icon(siDocker),
  icon(siSvelte),
  icon(siTailwindcss),
  icon(siLaravel),
  icon(siCodeigniter),
  icon(siJquery),
  icon(siBootstrap),
  { ...icon(siOpenjdk, '#ED8B00'), name: 'Java' },
  icon(siAndroid),
]
