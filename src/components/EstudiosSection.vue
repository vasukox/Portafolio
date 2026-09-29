<script setup>
import { education, certifications } from '../data/experience.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })
</script>

<template>
  <section
    id="estudios"
    ref="el"
    :class="['section bg-paper text-ink reveal', isVisible ? 'is-visible' : '']"
  >
    <div class="border-t border-line">
      <div class="container-x py-16 md:py-24">
        <div
          :class="['flex items-center justify-between pb-8 reveal', isVisible ? 'is-visible' : '']"
        >
          <p class="label-italic">(Formación & certificaciones)</p>
          <p class="label-num">(08)</p>
        </div>

        <h2
          :class="['display display-lg mb-12 reveal reveal-delay-1', isVisible ? 'is-visible' : '']"
        >
          Estudios
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div
            :class="['reveal reveal-delay-2', isVisible ? 'is-visible' : '']"
          >
            <h3 class="display display-sm mb-8 pb-4 border-b border-ink/15">Educación</h3>
            <ol class="space-y-8">
              <li
                v-for="(item, i) in education"
                :key="item.id"
                class="grid grid-cols-12 gap-3 md:gap-6"
              >
                <span class="col-span-2 label-num">0{{ i + 1 }}</span>
                <div class="col-span-10">
                  <h4 class="display text-2xl md:text-3xl mb-1">{{ item.title }}</h4>
                  <p class="text-base md:text-lg text-ink/80">{{ item.org }}</p>
                  <p class="label-italic text-sm mt-1 opacity-70">{{ item.period }}</p>
                </div>
              </li>
            </ol>
          </div>

          <div
            :class="['reveal reveal-delay-3', isVisible ? 'is-visible' : '']"
          >
            <h3 class="display display-sm mb-8 pb-4 border-b border-ink/15">Certificaciones</h3>
            <ul class="space-y-5">
              <li
                v-for="cert in certifications"
                :key="cert"
                class="flex items-start gap-3 text-base md:text-lg"
              >
                <span class="mt-2 inline-block h-[6px] w-[6px] bg-ink flex-shrink-0" />
                <span>{{ cert }}</span>
              </li>
            </ul>

            <div class="mt-12 pt-8 border-t border-ink/15">
              <h4 class="display text-2xl md:text-3xl mb-4">Idiomas</h4>
              <ul class="space-y-2 text-base md:text-lg">
                <li class="flex items-center justify-between">
                  <span>Español</span>
                  <span class="label-num">Nativo</span>
                </li>
                <li class="flex items-center justify-between">
                  <span>Inglés</span>
                  <span class="label-num">B1 → B2</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
