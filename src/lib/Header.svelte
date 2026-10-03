<script>
  import { onMount } from 'svelte'
  import ThemeToggle from './ThemeToggle.svelte'
  import { profile } from './data.js'

  const nav = [
    { href: '#perjalanan', label: 'Pengalaman' },
    { href: '#karya', label: 'Portfolio' },
  ]
  const github = profile.links[0].href

  // progres scroll halaman
  let progress = $state(0)
  onMount(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      progress = max > 0 ? Math.min(1, scrollY / max) : 0
    }
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  })
</script>

<div
  class="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
  style="transform: scaleX({progress})"
  aria-hidden="true"
></div>

<header class="fixed inset-x-0 top-4 z-50 flex justify-center px-3">
  <div
    class="flex w-full max-w-2xl items-center justify-between gap-2 rounded-full border border-line bg-bg/80 py-2 pl-3 pr-2 shadow-card backdrop-blur-xl"
  >
    <a href="#top" class="flex items-center gap-2 text-sm font-semibold tracking-tight" aria-label="Ke atas">
      <span class="grid size-7 place-items-center rounded-lg bg-accent font-mono text-[11px] font-bold text-onaccent">H</span>    </a>

    <nav class="flex items-center gap-0.5 text-[13px] text-sub">
      {#each nav as n}
        <a href={n.href} class="rounded-full px-2.5 py-1.5 transition-colors hover:bg-bg2 hover:text-ink sm:px-3">{n.label}</a>
      {/each}
    </nav>

    <div class="flex items-center gap-2">
      <ThemeToggle />
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        class="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-bg transition-opacity hover:opacity-85 sm:block"
      >
        GitHub ↗
      </a>
    </div>
  </div>
</header>
