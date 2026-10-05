<script setup>
import { reactive, ref } from 'vue'
import { profile } from '../data/profile.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })

const form = reactive({ name: '', email: '', message: '' })
const prepared = ref(false)

const submit = () => {
  const subject = encodeURIComponent(`Contacto desde el portafolio: ${form.name.trim()}`)
  const body = encodeURIComponent(`Nombre: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  prepared.value = true
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
            >
              <div class="grid grid-cols-2 gap-6">
                <label class="flex flex-col gap-1">
                  <span class="label-italic text-xs">(Tu nombre)</span>
                  <input
                    v-model="form.name"
                    name="name"
                    autocomplete="name"
                    maxlength="100"
                    required
                    type="text"
                    class="input-line text-sm py-3"
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="label-italic text-xs">(Tu email)</span>
                  <input
                    v-model="form.email"
                    name="email"
                    autocomplete="email"
                    maxlength="254"
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
                  name="message"
                  maxlength="1500"
                  required
                  rows="4"
                  class="input-line text-sm py-3 resize-none"
                />
              </label>

              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  class="pill text-xs py-3 px-5 disabled:opacity-50"
                >
                  Preparar correo
                </button>
                <a
                  href="/cv-andres-felipe-diaz.pdf"
                  download
                  class="pill text-xs py-3 px-5"
                >
                  Descargar CV
                </a>
              </div>

              <p class="text-sm text-ink/60" role="status" aria-live="polite">
                {{ prepared ? 'Correo preparado. Debes enviarlo desde tu aplicación de correo; si no se abrió, utiliza el enlace directo.' : 'Se abrirá tu aplicación de correo. El mensaje se envía cuando lo confirmes allí.' }}
              </p>

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
