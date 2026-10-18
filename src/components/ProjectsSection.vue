<script setup>
import { projects } from '../data/projects.js'
import { useReveal } from '../composables/useReveal.js'

const { el: header, isVisible: headerVisible } = useReveal({ threshold: 0.15 })

const itemReveals = projects.map(() => useReveal({ threshold: 0.1 }))
</script>

<template>
  <section id="proyectos" class="section bg-paper text-ink">
    <div class="border-t border-line">
      <div
        ref="header"
        :class="['container-x flex items-center justify-between pt-8 pb-2 reveal', headerVisible ? 'is-visible' : '']"
      >
        <p class="label-italic">(Trabajo seleccionado)</p>
        <p class="label-num">(03)</p>
      </div>
      <h2
        :class="['container-x display display-xl py-8 md:py-12 reveal reveal-delay-1', headerVisible ? 'is-visible' : '']"
      >
        Proyectos
      </h2>
      <div
        :class="['container-x pb-10 max-w-2xl reveal reveal-delay-2', headerVisible ? 'is-visible' : '']"
      >
        <p class="text-base md:text-lg text-ink/80">
          Integraciones, automatizaciones y plataformas internas en producción.
        </p>
      </div>
    </div>

    <article
      v-for="(p, i) in projects"
      :key="p.id"
      :class="[
        'border-t border-line',
        i % 2 === 0 ? 'bg-ink text-paper' : 'bg-paper text-ink'
      ]"
    >
      <div
        :ref="(el) => (itemReveals[i].el.value = el)"
        :class="[
          'container-x grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 py-14 md:py-20 reveal',
          itemReveals[i].isVisible.value ? 'is-visible' : ''
        ]"
      >
        <div
          :class="[
            'relative overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[520px]',
            i % 2 === 1 ? 'md:order-2' : ''
          ]"
        >
          <img
            :src="p.cover"
            :alt="p.title"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>

        <div
          :class="[
            'flex flex-col justify-between gap-8',
            i % 2 === 1 ? 'md:order-1' : ''
          ]"
        >
          <div class="flex items-center justify-between text-[11px] uppercase tracking-widest opacity-70">
            <span>{{ p.category }}</span>
            <span>0{{ i + 1 }}</span>
          </div>

          <div>
            <h3 class="display display-md">{{ p.title }}</h3>
            <p
              v-if="p.subtitle"
              class="label-italic text-base md:text-lg mt-2 opacity-85"
            >
              {{ p.subtitle }}
            </p>
          </div>

          <p class="max-w-md text-base md:text-lg opacity-90 leading-relaxed">
            {{ p.description }}
          </p>

          <ul class="flex flex-wrap gap-2">
            <li
              v-for="tag in p.tags"
              :key="tag"
              class="text-[11px] uppercase tracking-widest border border-current/40 px-2.5 py-1"
            >
              {{ tag }}
            </li>
          </ul>

          <div class="flex flex-wrap gap-5 pt-2">
            <a v-if="p.link && p.link !== '#'" :href="p.link" class="cta-underline" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
            <a v-if="p.github && p.github !== '#'" :href="p.github" class="cta-underline" target="_blank" rel="noopener noreferrer">Código ↗</a>
            <span
              v-if="p.featured"
              class="ml-auto inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-2 py-1 border border-current/40 rounded-full"
            >
              <span class="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              Destacado
            </span>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
