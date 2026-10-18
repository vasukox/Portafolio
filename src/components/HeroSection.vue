<script setup>
import { profile } from '../data/profile.js'
import { useReveal } from '../composables/useReveal.js'
import { useMagnetic } from '../composables/useMagnetic.js'
import RotatingWord from './RotatingWord.vue'

const { el: ctaEl, offset: ctaOffset } = useMagnetic(10)

const roleWords = [
  'integraciones',
  'automatizaciones',
  'soluciones backend',
  'plataformas internas',
  'microservicios',
]

const { el: revealEl, isVisible } = useReveal({ threshold: 0.05 })
</script>

<template>
  <section
    id="top"
    ref="revealEl"
    :class="['section bg-paper text-ink pt-24 md:pt-32 pb-12 md:pb-16 reveal', isVisible ? 'is-visible' : '']"
  >
    <div class="container-x">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch">
        <div class="relative aspect-[4/5] md:aspect-auto md:min-h-[640px] overflow-hidden bg-ink">
          <div
            class="absolute inset-0 bg-no-repeat bg-cover transition duration-700 hover:scale-[1.02]"
            :style="{
              backgroundImage: `url(${profile.image})`,
              backgroundPosition: '75% 30%'
            }"
            role="img"
            :aria-label="profile.name"
          ></div>
          <div class="absolute top-5 left-5 right-5 flex items-center gap-2 text-paper z-10">
            <span class="status-dot" />
            <span class="label-italic text-xs">Disponible · {{ profile.location }}</span>
          </div>
          <div class="absolute bottom-5 left-5 right-5 flex items-end justify-between text-paper z-10">
            <span class="label-italic text-xs">Ahora en Permoda (KOAJ)</span>
            <span class="label-num text-xs">(01)</span>
          </div>
        </div>

        <div class="relative flex flex-col justify-between py-2 md:py-4 gap-8">
          <div>
            <p class="label-italic mb-6">
              <a href="#contacto" class="hover:opacity-70 transition-opacity">
                ↳ Hablamos sobre tu proyecto
              </a>
            </p>
            <h1 class="display display-hero">
              Hola,<br />soy<br />{{ profile.name }}
            </h1>
          </div>

          <p class="max-w-md text-base md:text-xl leading-snug text-ink/80 flex flex-wrap items-baseline gap-x-2">
            <span>Diseño</span>
            <RotatingWord :words="roleWords" class="font-semibold text-ink" />
            <span>y construyo software que mueve el negocio.</span>
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <a
              ref="ctaEl"
              href="#contacto"
              class="magnetic pill text-xs py-2.5 px-5 bg-ink text-paper border-ink hover:bg-paper hover:text-ink"
              :style="{ transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)` }"
            >
              Trabajemos juntos →
            </a>
            <a :href="profile.cv" download class="pill text-xs py-2.5 px-5">
              Descargar CV
            </a>
            <a href="#proyectos" class="pill text-xs py-2.5 px-5">Ver proyectos</a>
          </div>
        </div>
      </div>

      <a
        href="#proyectos"
        class="hidden md:flex flex-col items-center gap-1.5 mx-auto w-fit pt-14 text-ink/55 hover:text-ink transition-colors duration-300"
        aria-label="Hacer scroll"
      >
        <span class="scroll-hint-text label-italic text-xs tracking-widest">Scroll</span>
        <span class="scroll-hint-bar block w-px h-8 bg-current/70" />
        <svg
          class="scroll-hint-arrow w-3 h-3"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </div>
  </section>
</template>
