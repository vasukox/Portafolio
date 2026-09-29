<script setup>
import { techs, softSkills, getTechIcon } from '../data/skills.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })
</script>

<template>
  <section
    id="habilidades"
    ref="el"
    :class="['section bg-paper text-ink py-16 md:py-24 reveal', isVisible ? 'is-visible' : '']"
  >
    <div class="container-x">
      <div
        :class="['flex items-center justify-between pb-8 reveal', isVisible ? 'is-visible' : '']"
      >
        <p class="label-italic">(Stack & herramientas)</p>
        <p class="label-num">(05)</p>
      </div>

      <h2
        :class="['display display-lg mb-10 reveal reveal-delay-1', isVisible ? 'is-visible' : '']"
      >
        Habilidades
      </h2>

      <p
        :class="['max-w-2xl text-base md:text-xl leading-snug mb-16 text-ink/80 reveal reveal-delay-2', isVisible ? 'is-visible' : '']"
      >
        Stack que uso a diario para diseñar, integrar y desplegar.
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <div
          v-for="t in techs"
          :key="t.name"
          :style="{ '--brand': t.color }"
          class="tech-card relative border border-ink/15 overflow-hidden aspect-square flex flex-col items-center justify-center p-4 cursor-default"
        >
          <span class="tech-card-bg" aria-hidden="true" />
          <span class="tech-card-shine" aria-hidden="true" />

          <div class="relative z-10 flex-1 flex flex-col items-center justify-center w-full transition-transform duration-500 ease-out group-hover:scale-105">
            <div class="flex-1 flex items-center justify-center w-full">
              <img
                :src="getTechIcon(t)"
                :alt="t.name"
                class="tech-icon w-12 h-12 md:w-16 md:h-16"
                loading="lazy"
              />
            </div>
            <span class="display text-base md:text-xl text-center leading-none mt-3 transition-colors duration-500">
              {{ t.name }}
            </span>
            <span class="tech-label label-italic text-[10px] mt-1.5 uppercase tracking-widest transition-colors duration-500">
              {{ t.category }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-20 pt-10 border-t border-ink/15">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div class="md:col-span-4">
            <h3 class="display display-sm">
              Y algo más que código
            </h3>
            <p class="label-italic mt-2 opacity-70">(Habilidades blandas)</p>
          </div>
          <ul class="md:col-span-8 flex flex-wrap gap-2">
            <li
              v-for="s in softSkills"
              :key="s"
              class="text-xs uppercase tracking-widest border border-ink/30 px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors cursor-default"
            >
              {{ s }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-card {
  transition:
    border-color 0.5s ease,
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.5s ease;
  background: var(--color-paper);
}
.tech-card:hover {
  border-color: transparent;
  transform: translateY(-6px);
  box-shadow:
    0 18px 36px -18px var(--brand),
    0 8px 18px -12px rgba(0, 0, 0, 0.18);
}

/* Background fill from bottom */
.tech-card-bg {
  position: absolute;
  inset: 0;
  background: var(--brand);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 0;
}
.tech-card:hover .tech-card-bg {
  transform: scaleY(1);
}

/* Shine sweep */
.tech-card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 35%,
    rgba(255, 255, 255, 0.25) 50%,
    transparent 65%
  );
  transform: translateX(-100%);
  transition: transform 0.9s ease;
  z-index: 1;
  pointer-events: none;
}
.tech-card:hover .tech-card-shine {
  transform: translateX(100%);
}

/* Icon hover transition */
.tech-icon {
  filter: grayscale(1) opacity(0.85);
  transition:
    filter 0.55s ease,
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.tech-card:hover .tech-icon {
  filter: brightness(0) invert(1);
  transform: scale(1.08);
}

/* Text colors on hover */
.tech-card:hover .display,
.tech-card:hover .tech-label {
  color: var(--color-paper);
}
@media (prefers-reduced-motion: reduce) {
  .tech-card,
  .tech-card-bg,
  .tech-card-shine,
  .tech-icon {
    transition: none !important;
  }
  .tech-card:hover { transform: none; }
}
</style>
