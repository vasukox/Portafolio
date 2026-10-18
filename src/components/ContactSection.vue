<script setup>
import { reactive, ref } from 'vue'
import { profile } from '../data/profile.js'
import { useReveal } from '../composables/useReveal.js'

const { el, isVisible } = useReveal({ threshold: 0.15 })

const form = reactive({ name: '', email: '', message: '' })
const error = ref('')

const submit = (event) => {
  error.value = ''
  if (!form.name.trim() || !form.message.trim()) {
    event.preventDefault()
    error.value = 'Escribe tu nombre y un mensaje; los campos no pueden contener solo espacios.'
  }
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
              :action="`https://formsubmit.co/${profile.email}`"
              method="POST"
              @submit="submit"
            >
              <input type="hidden" name="_subject" value="Nuevo contacto desde el portafolio" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label class="flex flex-col gap-1">
                  <span class="label-italic text-xs">(Tu nombre)</span>
                  <input
                    v-model.trim="form.name"
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
                    v-model.trim="form.email"
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
                  v-model.trim="form.message"
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
                  Enviar mensaje →
                </button>
                <a
                  :href="profile.cv"
                  download
                  class="pill text-xs py-3 px-5"
                >
                  Descargar CV
                </a>
              </div>

              <p class="text-sm text-ink/60" role="status" aria-live="polite">
                {{ error || 'Al enviar, pasarás a FormSubmit para completar la verificación y confirmar el envío.' }}
              </p>

              <p class="text-sm text-ink/60">
                Tu nombre, correo y mensaje se procesan mediante FormSubmit para responder a tu consulta. También puedes escribir directamente a
                <a :href="`mailto:${profile.email}`" class="cta-underline break-all">
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
