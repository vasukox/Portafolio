<script setup>
import { logros } from '../data/logros.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })
</script>

<template>
  <section
    id="logros"
    ref="el"
    :class="['section bg-paper text-ink reveal', isVisible ? 'is-visible' : '']"
  >
    <div class="border-t border-line">
      <div class="container-x py-16 md:py-24">
        <div
          :class="['flex items-center justify-between pb-8 reveal', isVisible ? 'is-visible' : '']"
        >
          <p class="label-italic">(Lo que entrego)</p>
          <p class="label-num">(06)</p>
        </div>

        <h2
          :class="['display display-lg mb-8 reveal reveal-delay-1', isVisible ? 'is-visible' : '']"
        >
          Logros
        </h2>

        <p
          :class="['max-w-2xl text-base md:text-xl leading-snug mb-14 text-ink/80 reveal reveal-delay-2', isVisible ? 'is-visible' : '']"
        >
          Cuatro áreas donde aporto valor real a equipos de ingeniería y producto.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <article
            v-for="(item, i) in logros"
            :key="item.id"
            :class="[
              'logro relative border-t pt-8 reveal',
              item.featured ? 'border-ink/40 featured' : 'border-ink/15',
              `reveal-delay-${Math.min(i + 1, 5)}`,
              isVisible ? 'is-visible' : '',
            ]"
          >
            <div class="flex items-baseline justify-between mb-4">
              <span class="label-num">0{{ i + 1 }}</span>
              <span
                v-if="item.tag"
                class="featured-tag"
                aria-label="Categoría destacada"
              >
                <span class="featured-dot" aria-hidden="true" />
                {{ item.tag }}
              </span>
              <span
                v-else
                class="text-[11px] uppercase tracking-widest opacity-70"
              >
                {{ item.title }}
              </span>
            </div>

            <h3 class="display display-sm mb-2">
              {{ item.title }}
            </h3>
            <p
              v-if="item.subtitle"
              class="label-italic text-sm mb-3 opacity-80"
            >
              {{ item.subtitle }}
            </p>
            <p
              :class="[
                'leading-relaxed mb-6',
                item.featured ? 'text-base md:text-lg text-ink' : 'text-base md:text-lg text-ink/80',
              ]"
            >
              {{ item.description }}
            </p>

            <ul class="space-y-2">
              <li
                v-for="d in item.deliverables"
                :key="d"
                class="flex items-start gap-3 text-sm md:text-base text-ink/80"
              >
                <span
                  :class="[
                    'mt-2 inline-block h-[6px] w-[6px] flex-shrink-0',
                    item.featured ? 'bg-ink' : 'bg-ink/70',
                  ]"
                />
                <span>{{ d }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured {
  position: relative;
  background: var(--color-paper);
}
.featured::after {
  content: "";
  position: absolute;
  inset: -1px 0 0 0;
  border-top: 1px solid var(--color-ink);
  pointer-events: none;
}

.featured-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 600;
  color: var(--color-ink);
  background: var(--color-cream);
  border: 1px solid var(--color-ink);
  padding: 4px 10px 4px 8px;
  border-radius: 999px;
}
.featured-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0 rgba(194, 65, 12, 0.6);
  animation: pulse-accent 1.8s ease-out infinite;
}
@keyframes pulse-accent {
  0%   { box-shadow: 0 0 0 0 rgba(194, 65, 12, 0.55); }
  70%  { box-shadow: 0 0 0 8px rgba(194, 65, 12, 0); }
  100% { box-shadow: 0 0 0 0 rgba(194, 65, 12, 0); }
}

.logro {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.featured.logro {
  border-top-width: 2px;
  padding-top: calc(2rem - 1px);
}
</style>
