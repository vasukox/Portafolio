<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/profile.js'

const navLinks = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Logros', href: '#logros' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Estudios', href: '#estudios' },
]

const scrolled = ref(false)
const open = ref(false)
const activeId = ref('')

let ticking = false
let frame = null

const NAV_OFFSET = 90
const HERO_ZONE = 120
const BOTTOM_THRESHOLD = 80

const isAtBottom = () =>
  window.scrollY + window.innerHeight >=
  document.documentElement.scrollHeight - BOTTOM_THRESHOLD

const isInHeroZone = () => window.scrollY < HERO_ZONE

const updateActive = () => {
  scrolled.value = window.scrollY > 30

  if (isInHeroZone()) {
    activeId.value = ''
    return
  }

  const ids = navLinks.map((l) => l.href.slice(1))

  if (isAtBottom()) {
    activeId.value = ids[ids.length - 1]
    return
  }

  let current = ''
  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= NAV_OFFSET) {
      current = id
    } else {
      break
    }
  }
  activeId.value = current
}

const onScroll = () => {
  if (ticking) return
  frame = window.requestAnimationFrame(() => {
    updateActive()
    ticking = false
  })
  ticking = true
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateActive()
  // Re-run after images load so layout settles
  window.addEventListener('load', updateActive, { once: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  window.removeEventListener('load', updateActive)
  cancelAnimationFrame(frame)
})

const close = () => (open.value = false)
</script>

<template>
  <header
    @keydown.esc="close"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
      scrolled || open ? 'bg-paper/90 backdrop-blur border-b border-line' : 'bg-transparent'
    ]"
  >
    <nav class="container-x flex items-center justify-between h-14 xl:h-16">
      <a href="#top" class="display text-base tracking-tight">{{ profile.short }}</a>

      <ul class="hidden xl:flex items-center gap-7">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            :class="[
              'nav-link transition-opacity duration-300',
              activeId === link.href.slice(1) ? 'is-active opacity-100' : 'opacity-70 hover:opacity-100'
            ]"
            :aria-current="activeId === link.href.slice(1) ? 'true' : 'false'"
          >
            {{ link.label }}
          </a>
        </li>
        <li class="ml-2">
          <a
            :href="profile.cv"
            download
            class="inline-flex items-center text-xs uppercase tracking-widest mr-3 hover:opacity-70 transition-opacity"
            aria-label="Descargar CV en PDF"
            title="Descargar CV"
          >
            CV
          </a>
          <a
            href="#contacto"
            class="pill text-xs px-3.5 py-1.5"
            aria-label="Ir a contacto"
          >
            Hablemos
          </a>
        </li>
      </ul>

      <button
        class="xl:hidden inline-flex flex-col gap-[5px] p-2 -mr-2"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="open"
        aria-controls="mobile-navigation"
        @click="open = !open"
      >
        <span
          :class="[
            'block h-[2px] w-6 bg-ink transition-transform',
            open ? 'translate-y-[7px] rotate-45' : ''
          ]"
        />
        <span
          :class="[
            'block h-[2px] w-6 bg-ink transition-opacity',
            open ? 'opacity-0' : ''
          ]"
        />
        <span
          :class="[
            'block h-[2px] w-6 bg-ink transition-transform',
            open ? '-translate-y-[7px] -rotate-45' : ''
          ]"
        />
      </button>
    </nav>

    <transition name="fade">
      <div
        v-if="open"
        id="mobile-navigation"
        class="xl:hidden fixed inset-x-0 top-14 bg-paper border-t border-line max-h-[calc(100dvh-3.5rem)] overflow-y-auto shadow-lg"
      >
        <ul class="container-x flex flex-col gap-5 py-6">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              :class="[
                'display text-3xl',
                activeId === link.href.slice(1) ? 'is-active' : ''
              ]"
              @click="close"
            >
              {{ link.label }}
            </a>
          </li>
          <li>
            <a
              :href="profile.cv"
              download
              class="display text-3xl"
              @click="close"
            >
              Descargar CV ↗
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              class="inline-flex items-center display text-3xl"
              @click="close"
            >
              Hablemos →
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 240ms ease, transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
