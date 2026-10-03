<script>
  import { profile } from './data.js'
</script>

<section id="pendidikan" class="mx-auto max-w-4xl px-5 pb-24 sm:pb-32">
  <div class="mx-auto max-w-3xl text-center">
    <h2 data-aos="fade-up" data-aos-delay="80" class="h-section text-[clamp(2.1rem,5vw,3.6rem)]">Pendidikan</h2>
  </div>

  <ul class="mt-14 grid gap-4 sm:grid-cols-2">
    {#each profile.education as e, i}
      <li
        data-aos="fade-up" data-aos-delay="i * 80"
        class="rounded-2xl border border-line bg-bg1 p-6 shadow-card transition-colors hover:border-accent sm:p-7"
      >
        <p class="font-mono text-xs text-mute">{e.level}</p>
        <h3 class="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{e.school}</h3>
        <p class="mt-0.5 text-sm font-medium text-acc">{e.major}</p>
      </li>
    {/each}
  </ul>
</section>
