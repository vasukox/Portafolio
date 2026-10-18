<script setup>
import { profile } from '../data/profile.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })

const pages = [
  { label: 'Inicio', href: '#top' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Estudios', href: '#estudios' },
  { label: 'Contacto', href: '#contacto' },
]

const social = [...profile.socials, { label: 'Descargar CV ↓', href: profile.cv, download: true }]

</script>

<template>
  <footer
    ref="el"
    :class="['section bg-paper text-ink py-14 md:py-20 reveal', isVisible ? 'is-visible' : '']"
  >
    <div class="container-x">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 border-b border-ink/15">
      <h2 class="display display-md leading-none">
        {{ profile.short }}
      </h2>
        <div class="flex flex-col md:items-end gap-4">
          <p class="label-italic">¿Construimos algo?</p>
          <a
            :href="`mailto:${profile.email}`"
            class="text-lg sm:text-2xl md:text-3xl font-semibold break-all leading-normal hover:underline"
          >
            {{ profile.email }}
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-10">
        <div v-for="col in [{ label: 'Páginas', links: pages }, { label: 'Sobre el sitio', links: [
          { label: 'Habilidades', href: '#habilidades' },
          { label: 'Logros', href: '#logros' },
          { label: 'Experiencia', href: '#experiencia' },
          { label: 'Estudios', href: '#estudios' },
        ] }, { label: 'Redes', links: social }]" :key="col.label">
          <p class="label-italic text-xs mb-3">({{ col.label }})</p>
          <ul class="space-y-1.5">
            <li v-for="link in col.links" :key="link.label">
              <a
                :href="link.href"
                :download="link.download ? '' : undefined"
                :target="!link.download && link.href.startsWith('http') ? '_blank' : undefined"
                :rel="!link.download && link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="text-sm md:text-base cta-underline py-2"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-ink/15 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-widest opacity-70">
        <span>© {{ new Date().getFullYear() }} {{ profile.fullName }}</span>
        <a href="#top" class="cta-underline">Volver arriba ↑</a>
      </div>
    </div>
  </footer>
</template>
