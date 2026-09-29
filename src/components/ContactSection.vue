<script setup>
import { reactive, ref } from 'vue'
import { profile } from '../data/profile.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
const sending = ref(false)

const submit = async () => {
  sending.value = true
  await new Promise((r) => setTimeout(r, 800))
  sending.value = false
  sent.value = true
  form.name = ''
  form.email = ''
  form.message = ''
  setTimeout(() => (sent.value = false), 3500)
}
</script>

<template>
  <section
    id="contacto"
    ref="el"
    :class="['section bg-paper text-ink reveal', isVisible ? 'is-visible' : '']"
  >
    <div class="border-t border-line">
      <div class="container-x py-16 md:py-24">
        <div class="flex items-center justify-between pb-8">
          <p class="label-italic">(Disponible ahora)</p>
          <p class="label-num">(09)</p>
        </div>

        <h2 class="display display-lg mb-10">
          Hablemos
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
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

          <div class="flex flex-col">
            <p class="max-w-md text-base md:text-lg text-ink/80 mb-3">
              Cuéntame sobre tu proyecto. Respondo en menos de 48h.
            </p>
          <p class="text-sm text-ink/60 mb-10">
            Bogotá, Colombia · {{ profile.phone }}
          </p>

            <form
              class="flex flex-col gap-6 max-w-md"
              @submit.prevent="submit"
              novalidate
            >
              <div class="grid grid-cols-2 gap-6">
                <label class="flex flex-col gap-1">
                  <span class="label-italic text-xs">(Tu nombre)</span>
                  <input
                    v-model="form.name"
                    required
                    type="text"
                    class="input-line text-sm py-3"
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="label-italic text-xs">(Tu email)</span>
                  <input
                    v-model="form.email"
                    required
                    type="email"
                    class="input-line text-sm py-3"
                  />
                </label>
              </div>

              <label class="flex flex-col gap-1">
                <span class="label-italic text-xs">(Mensaje)</span>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  class="input-line text-sm py-3 resize-none"
                />
              </label>

              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  :disabled="sending"
                  class="pill text-xs py-3 px-5 disabled:opacity-50"
                  :class="sent ? 'bg-ink text-paper border-ink' : ''"
                >
                  <span v-if="sending">Enviando...</span>
                  <span v-else-if="sent">¡Enviado! ✓</span>
                  <span v-else>Enviar mensaje</span>
                </button>
                <a
                  href="/cv-andres-felipe-diaz.pdf"
                  download
                  class="pill text-xs py-3 px-5"
                >
                  Descargar CV
                </a>
              </div>

              <p class="text-sm text-ink/60">
                ¿Prefieres email directo?
                <a :href="`mailto:${profile.email}`" class="cta-underline">
                  {{ profile.email }}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
