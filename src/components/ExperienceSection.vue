<script setup>
import { experience } from '../data/experience.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })
</script>

<template>
  <section
    id="experiencia"
    ref="el"
    :class="['section bg-ink has-noise text-paper py-16 md:py-24 reveal', isVisible ? 'is-visible' : '']"
  >
    <div class="container-x">
      <div
        :class="['flex items-center justify-between pb-8 reveal', isVisible ? 'is-visible' : '']"
      >
        <p class="label-italic">(Trayectoria & notas)</p>
        <p class="label-num">(07)</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-14">
        <h2
          :class="['display display-md reveal reveal-delay-1', isVisible ? 'is-visible' : '']"
        >
          Diseñando un flujo continuo de craft y detalle.
        </h2>
        <div
          :class="['space-y-4 text-base md:text-lg opacity-90 leading-relaxed pt-2 reveal reveal-delay-2', isVisible ? 'is-visible' : '']"
        >
          <p>
            Cada proyecto es una oportunidad para elevar el estándar.
            Cuidar los detalles, iterar con intención y construir cosas
            que se sientan firmes es lo que guía mi trabajo.
          </p>
          <p>
            Aquí comparto mi recorrido profesional y aprendizajes en sistemas, integración y automatización.
          </p>
        </div>
      </div>

      <ol class="border-t border-paper/20">
        <li
          v-for="(item, i) in experience"
          :key="item.id"
          :class="['grid grid-cols-12 gap-4 md:gap-6 py-8 md:py-10 border-b border-paper/20 group hover:bg-paper/5 transition-colors reveal', `reveal-delay-${Math.min(i + 1, 5)}`, isVisible ? 'is-visible' : '']"
        >
          <span class="col-span-2 md:col-span-2 label-num">0{{ i + 1 }}</span>
          <span class="col-span-10 md:col-span-3 text-[11px] uppercase tracking-widest opacity-80 pt-1">
            {{ item.period }}
          </span>
          <div class="col-span-12 md:col-span-7">
            <h3 class="display text-2xl md:text-4xl mb-1">{{ item.role }}</h3>
            <p class="text-sm md:text-base opacity-70 mb-3">@ {{ item.company }} · {{ item.location }}</p>
            <p class="text-base md:text-lg opacity-90 max-w-2xl">{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
