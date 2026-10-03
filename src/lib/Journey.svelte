<script>
  import { onMount } from 'svelte'
  import { jobs } from './data.js'

  const entries = jobs.map((j) => ({
    date: `${j.from} – ${j.to ?? 'sekarang'}`,
    title: j.company,
    sub: j.role,
    notes: j.notes,
    live: !j.to,
  }))

  let box = $state()
  let lis = $state([])
  let progress = $state(0)
  let reached = $state(entries.map(() => false))

  onMount(() => {
    const update = () => {
      const line = innerHeight * 0.6
      const r = box.getBoundingClientRect()
      progress = Math.min(1, Math.max(0, (line - r.top) / r.height))
      reached = lis.map((el) => !!el && el.getBoundingClientRect().top + 30 < line)
    }
    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => {
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
    }
  })
</script>

<section id="perjalanan" class="mx-auto max-w-4xl px-5 pb-24 sm:pb-32">
  <div class="mx-auto max-w-3xl text-center">
    <h2 data-aos="fade-up" data-aos-delay="80" class="h-section text-[clamp(2.1rem,5vw,3.6rem)]">Pengalaman kerja</h2>
  </div>

  <div bind:this={box} class="relative mt-16">
    <!-- garis timeline: terisi mengikuti scroll -->
    <span class="absolute bottom-0 left-[7px] top-4 w-px bg-line sm:left-[10.5rem]" aria-hidden="true">
      <span class="block w-full bg-accent" style:height="{progress * 100}%"></span>
    </span>

    <ol class="space-y-6">
      {#each entries as e, i}
        <li
          bind:this={lis[i]}
          data-aos="fade-up" data-aos-delay="i * 40"
          class="relative grid gap-x-12 gap-y-3 pl-9 sm:grid-cols-[9rem_1fr] sm:pl-0"
        >
          <!-- titik -->
          <span
            class="absolute left-0 top-[1.55rem] z-10 size-[15px] rounded-full border-2 transition-all duration-500 sm:left-[10.5rem] sm:-translate-x-[7px] {reached[i]
              ? 'scale-110 border-accent bg-accent shadow-[0_0_0_5px_var(--glow)]'
              : 'border-line bg-bg'}"
            aria-hidden="true"
          ></span>

          <div class="pt-5 sm:text-right">
            <p class="font-mono text-sm tabular-nums {reached[i] ? 'text-ink' : 'text-mute'} transition-colors">{e.date}</p>
            {#if e.live}
              <span class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ok/15 px-2.5 py-1 text-[11px] font-semibold text-ok">
                <span class="size-1.5 rounded-full bg-ok"></span>Aktif
              </span>
            {/if}
          </div>

          <div class="rounded-2xl border border-line bg-bg1 p-6 shadow-card transition-colors hover:border-accent sm:p-7">
            <h3 class="text-xl font-bold tracking-tight sm:text-2xl">{e.title}</h3>
            <p class="mt-0.5 text-sm font-medium text-acc">{e.sub}</p>
            <ul class="mt-4 space-y-2 text-[15px] text-sub">
                {#each e.notes as n}
                  <li class="flex gap-3"><span class="mt-[0.6rem] size-1 shrink-0 rounded-full bg-mute"></span>{n}</li>
                {/each}
              </ul>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>
