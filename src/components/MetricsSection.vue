<script setup>
import { useReveal } from '../composables/useReveal.js'
import MetricItem from './MetricItem.vue'

const { el: header, isVisible: headerVisible } = useReveal({ threshold: 0.2 })

const metrics = [
  { value: 99.8, suffix: '%', label: 'Integridad de datos', sub: 'en 50K+ transacciones/mes' },
  { value: 94, prefix: '-', suffix: '%', label: 'Tiempo de deploy', sub: '4h → 15 min con Docker' },
  { value: 20, suffix: 'K+', label: 'Empleados gestionados', sub: 'a nivel nacional (SST)' },
  { value: 60, prefix: '-', suffix: '%', label: 'Tiempos de facturación', sub: 'DIAN, 4 sucursales' },
]
</script>

<template>
  <section id="metricas" class="section bg-ink has-noise text-paper">
    <div class="container-x py-20 md:py-28">
      <div
        ref="header"
        :class="['flex items-center justify-between pb-10 reveal', headerVisible ? 'is-visible' : '']"
      >
        <p class="label-italic">(Resultados en producción)</p>
        <p class="label-num">(02)</p>
      </div>

      <h2
        :class="['display display-lg mb-16 reveal reveal-delay-1', headerVisible ? 'is-visible' : '']"
      >
        Métricas<br />reales.
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 border-t border-paper/20 pt-12">
        <MetricItem
          v-for="(m, i) in metrics"
          :key="m.label"
          :metric="m"
          :index="i"
        />
      </div>
    </div>
  </section>
</template>
