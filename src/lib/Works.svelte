<script>
  import { projects } from './data.js'
  import { tilt } from './tilt.js'

  let dialog = $state()
  let current = $state(0) // proyek yang dibuka di modal
  let slide = $state(0) // gambar aktif di carousel
  let touchX = 0

  const p = $derived(projects[current])

  function open(i) {
    current = i
    slide = 0
    dialog.showModal()
    document.body.style.overflow = 'hidden'
  }
  function close() {
    dialog.close()
  }
  function onClose() {
    document.body.style.overflow = ''
  }
  function go(d) {
    const n = p.imgs.length
    slide = (slide + d + n) % n
  }
  function onKey(e) {
    if (!dialog?.open) return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }
  function onBackdrop(e) {
    if (e.target === dialog) close()
  }
</script>

<svelte:window onkeydown={onKey} />

<section id="karya" class="border-t border-line bg-bg1 py-24 sm:py-32">
  <div class="mx-auto max-w-6xl px-5">
    <div class="mx-auto max-w-3xl text-center">
      <h2 data-aos="fade-up" data-aos-delay="80" class="h-section mt-4 text-[clamp(2.1rem,5vw,3.6rem)]">Portfolio</h2>
    </div>

    <ul class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {#each projects as pr, i}
        <li data-aos="fade-up" data-aos-delay="(i % 3) * 70">
          <button
            use:tilt
            onclick={() => open(i)}
            class="group relative block w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-line bg-bg text-left shadow-card transition-[transform,border-color,box-shadow] duration-200 ease-out hover:border-accent hover:shadow-window"
          >
            <!-- titik cahaya mengikuti kursor -->
            <span
              class="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style="background: radial-gradient(360px circle at var(--gx, 50%) var(--gy, 50%), var(--glow), transparent 65%)"
              aria-hidden="true"
            ></span>
            <div class="relative aspect-[16/10] overflow-hidden bg-bg2">
              <img
                src="./img/{pr.imgs[0]}"
                alt="Tampilan {pr.title}"
                loading="lazy"
                class="size-full object-cover object-top transition-all duration-700 group-hover:scale-105 {pr.imgs[1] ? 'group-hover:opacity-0' : ''}"
              />
              <!-- gambar kedua muncul saat hover -->
              {#if pr.imgs[1]}
                <img
                  src="./img/{pr.imgs[1]}"
                  alt=""
                  loading="lazy"
                  class="absolute inset-0 size-full scale-105 object-cover object-top opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
                />
              {/if}
              <span
                class="absolute right-3 top-3 rounded-full bg-bg/85 px-2.5 py-1 font-mono text-[11px] backdrop-blur"
              >
                {pr.imgs.length} gambar
              </span>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold tracking-tight">{pr.title}</h3>
              {#if pr.client}<p class="mt-1 text-sm text-sub">{pr.client}</p>{/if}
              <div class="mt-4 flex flex-wrap items-center gap-1.5">
                {#each pr.tech as t}
                  <span class="rounded-full bg-bg2 px-2.5 py-1 font-mono text-[11px] text-sub">{t}</span>
                {/each}
                <span class="ml-auto text-sm font-semibold text-acc transition-transform group-hover:translate-x-1">Detail →</span>
              </div>
            </div>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</section>

<!-- modal detail proyek -->
<dialog
  bind:this={dialog}
  onclose={onClose}
  onclick={onBackdrop}
  aria-labelledby="modal-title"
  class="m-auto w-[min(56rem,94vw)] max-h-[92vh] overflow-y-auto rounded-[1.5rem] border border-line bg-bg p-0 text-ink shadow-window backdrop:bg-black/60 backdrop:backdrop-blur-sm"
>
  <div class="relative">
    <button
      onclick={close}
      aria-label="Tutup"
      class="absolute right-3 top-3 z-20 grid size-9 cursor-pointer place-items-center rounded-full bg-bg/90 shadow-card backdrop-blur transition-colors hover:bg-bg2"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>

    <!-- carousel -->
    <div
      class="relative aspect-[16/10] select-none overflow-hidden bg-bg2"
      ontouchstart={(e) => (touchX = e.touches[0].clientX)}
      ontouchend={(e) => {
        const dx = e.changedTouches[0].clientX - touchX
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
      }}
    >
      {#each p.imgs as src, i}
        <img
          src="./img/{src}"
          alt={i === slide ? `${p.title} — gambar ${i + 1}` : ''}
          class="absolute inset-0 size-full object-contain transition-opacity duration-500 {i === slide ? 'opacity-100' : 'opacity-0'}"
        />
      {/each}

      {#if p.imgs.length > 1}
        <button
          onclick={() => go(-1)}
          aria-label="Gambar sebelumnya"
          class="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-bg/90 shadow-card backdrop-blur transition-colors hover:bg-bg2"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button
          onclick={() => go(1)}
          aria-label="Gambar berikutnya"
          class="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-bg/90 shadow-card backdrop-blur transition-colors hover:bg-bg2"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7" /></svg>
        </button>
        <div class="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {#each p.imgs as _, i}
            <button
              onclick={() => (slide = i)}
              aria-label="Gambar {i + 1}"
              class="h-1.5 cursor-pointer rounded-full transition-all {i === slide ? 'w-6 bg-accent' : 'w-1.5 bg-ink/30 hover:bg-ink/50'}"
            ></button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- detail -->
    <div class="grid gap-6 p-6 sm:grid-cols-[1.4fr_1fr] sm:p-8">
      <div>
        <p class="eyebrow">Detail proyek</p>
        <h3 id="modal-title" class="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{p.title}</h3>
        {#if p.desc}<p class="mt-3 leading-relaxed text-sub">{p.desc}</p>{/if}
        {#if p.links}
          <div class="mt-5 flex flex-wrap gap-2">
            {#each p.links as l}
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-bg transition-opacity hover:opacity-85"
              >
                {l.label} ↗
              </a>
            {/each}
          </div>
        {/if}
      </div>
      <dl class="space-y-4 text-sm">
        {#if p.client}
          <div>
            <dt class="eyebrow">Klien</dt>
            <dd class="mt-1.5 font-medium">{p.client}</dd>
          </div>
        {/if}
        <div>
          <dt class="eyebrow">Teknologi</dt>
          <dd class="mt-1.5 flex flex-wrap gap-1.5">
            {#each p.tech as t}
              <span class="rounded-full border border-line bg-bg1 px-3 py-1 font-mono text-xs">{t}</span>
            {/each}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</dialog>
