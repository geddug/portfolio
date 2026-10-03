<script>
  import { onMount } from 'svelte'

  let theme = $state('light')

  onMount(() => {
    theme = document.documentElement.dataset.theme || 'light'
  })

  function set(t) {
    theme = t
    document.documentElement.dataset.theme = t
    try {
      localStorage.setItem('theme', t)
    } catch (e) {}
  }
</script>

<div class="flex items-center gap-0.5 rounded-full bg-bg2 p-0.5" role="group" aria-label="Tema">
  <button
    onclick={() => set('light')}
    aria-label="Mode terang"
    aria-pressed={theme === 'light'}
    class="grid size-7 cursor-pointer place-items-center rounded-full transition-colors {theme === 'light'
      ? 'bg-bg text-ink shadow-sm'
      : 'text-mute hover:text-ink'}"
  >
    <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  </button>
  <button
    onclick={() => set('dark')}
    aria-label="Mode gelap"
    aria-pressed={theme === 'dark'}
    class="grid size-7 cursor-pointer place-items-center rounded-full transition-colors {theme === 'dark'
      ? 'bg-bg text-ink shadow-sm'
      : 'text-mute hover:text-ink'}"
  >
    <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  </button>
</div>
