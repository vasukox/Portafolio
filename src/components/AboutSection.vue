<script setup>
import { profile } from '../data/profile.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })
</script>

<template>
  <section
    id="sobre-mi"
    ref="el"
    :class="['section bg-ink has-noise text-paper py-16 md:py-24 reveal', isVisible ? 'is-visible' : '']"
  >
    <div
      :class="[
        'container-x reveal reveal-delay-1',
        isVisible ? 'is-visible' : ''
      ]"
    >
      <div class="flex items-center justify-between pb-8">
        <p class="label-italic">(Quién soy)</p>
        <p class="label-num">(04)</p>
      </div>

      <h2 class="display display-lg mb-10 text-paper">
        Conóceme
      </h2>

      <p class="max-w-2xl text-base md:text-xl leading-snug mb-14 text-paper/90">
        Descubre mi misión, valores y la persona detrás de cada proyecto.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div class="relative aspect-[4/5] md:aspect-auto md:min-h-[520px] overflow-hidden">
          <div
            class="absolute inset-0 bg-no-repeat bg-cover grayscale"
            :style="{
              backgroundImage: `url(${profile.image})`,
              backgroundPosition: '75% 30%'
            }"
            role="img"
            :aria-label="profile.name"
          ></div>
        </div>

        <div class="flex flex-col gap-6 md:pt-10">
          <p class="text-base md:text-lg leading-relaxed text-paper/90">
            {{ profile.bio }}
          </p>

          <div class="grid grid-cols-2 gap-x-6 gap-y-8 pt-10 border-t border-paper/20">
            <div>
              <p class="label-italic mb-2 text-paper/80">(Rol)</p>
              <p class="text-base md:text-lg text-paper">{{ profile.role }}</p>
            </div>
            <div>
              <p class="label-italic mb-2 text-paper/80">(Ubicación)</p>
              <p class="text-base md:text-lg text-paper">{{ profile.location }}</p>
            </div>
            <div>
              <p class="label-italic mb-2 text-paper/80">(Email)</p>
              <a
                :href="`mailto:${profile.email}`"
                class="text-base md:text-lg text-paper cta-underline break-all"
              >
                {{ profile.email }}
              </a>
            </div>
            <div>
              <p class="label-italic mb-2 text-paper/80">(Redes)</p>
              <ul class="flex flex-wrap gap-3">
                <li v-for="s in profile.socials" :key="s.label">
                  <a
                    :href="s.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-base md:text-lg text-paper cta-underline"
                  >
                    {{ s.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
