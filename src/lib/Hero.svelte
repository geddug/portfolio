<script>
  import { profile } from './data.js'
  import { stack } from './stack.js'

  // cahaya yang mengikuti kursor (hanya di perangkat dengan mouse)
  let mouse = $state(null)
  function onMove(e) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
  }
</script>

<section
  id="top"
  onpointermove={onMove}
  onpointerleave={() => (mouse = null)}
  class="relative overflow-hidden px-5 pb-24 pt-32 sm:pb-32 sm:pt-44"
>
  <!-- cahaya lembut di belakang judul -->
  <div
    class="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
    style="background: radial-gradient(closest-side, var(--glow), transparent)"
    aria-hidden="true"
  ></div>
  <div
    class="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
    style="opacity: {mouse ? 1 : 0}; background: radial-gradient(380px circle at {mouse?.x ?? 0}px {mouse?.y ?? 0}px, var(--glow), transparent 70%)"
    aria-hidden="true"
  ></div>

  <div class="mx-auto max-w-3xl text-center">
    <img
      data-aos="fade-up"
      src="./img/me.jpg"
      alt="Foto Yalin Hakiki"
      class="mx-auto mb-8 size-24 rounded-full border border-line object-cover object-[50%_20%] shadow-card"
    />

    <h1 data-aos="fade-up" data-aos-delay="80" class="h-display text-[clamp(2.8rem,8vw,6rem)]">
      Hi, saya <span class="text-acc">Yalin Hakiki</span>.
    </h1>

    <p data-aos="fade-up" data-aos-delay="160" class="mx-auto mt-7 max-w-2xl text-[clamp(1.05rem,.4vw+.95rem,1.25rem)] leading-relaxed text-sub">
      {profile.about}
    </p>

    <ul data-aos="fade-up" data-aos-delay="240" class="mt-10 flex flex-wrap justify-center gap-2.5" aria-label="Teknologi yang saya pakai">
      {#each stack as t, i}
        <li
          style="animation: float {4 + (i % 3) * 0.7}s ease-in-out {i * -0.6}s infinite"
          class="flex items-center gap-2.5 rounded-2xl border border-line bg-bg1 py-2 pl-3 pr-4 text-sm font-medium shadow-card transition-colors duration-200 hover:border-accent"
        >
          <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill={t.color} aria-hidden="true"><path d={t.path} /></svg>
          {t.name}
        </li>
      {/each}
    </ul>

    <div data-aos="fade-up" data-aos-delay="320" class="mt-10 flex flex-wrap items-center justify-center gap-3">
      <a href="#karya" class="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-85">
        Lihat portfolio
      </a>
      <a href="#perjalanan" class="rounded-full bg-bg2 px-6 py-3 text-sm font-semibold transition-colors hover:bg-line">
        Pengalaman
      </a>
    </div>
  </div>
</section>
