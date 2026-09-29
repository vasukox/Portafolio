<script setup>
import { computed } from 'vue'
import { useReveal } from '../composables/useReveal.js'
import { useCounter } from '../composables/useCounter.js'
import SlotNumber from './SlotNumber.vue'

const props = defineProps({
  metric: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { el, isVisible } = useReveal({ threshold: 0.3 })
const { value, phase } = useCounter(props.metric.value, {
  duration: 2000,
  decimals: props.metric.value % 1 !== 0 ? 1 : 0,
  delay: props.index * 140,
})

const decimals = computed(() => (props.metric.value % 1 !== 0 ? 1 : 0))
</script>

<template>
  <div
    ref="el"
    :class="[
      'metric flex flex-col gap-2 reveal',
      `reveal-delay-${Math.min(index + 1, 5)}`,
      isVisible ? 'is-visible' : '',
      phase === 'done' ? 'is-done' : '',
    ]"
  >
    <div
      :class="[
        'metric-number display text-6xl md:text-7xl lg:text-8xl leading-none flex items-baseline gap-1',
        phase === 'done' ? 'settled' : '',
      ]"
    >
      <span
        v-if="metric.prefix"
        class="text-paper/60 text-3xl md:text-5xl self-start"
      >{{ metric.prefix }}</span>
      <SlotNumber
        :value="value"
        :decimals="decimals"
        :duration="280"
      />
      <span class="text-paper/60 text-3xl md:text-4xl">{{ metric.suffix }}</span>
    </div>
    <p class="display text-lg md:text-xl mt-3 metric-label">{{ metric.label }}</p>
    <p class="label-italic text-sm opacity-70 metric-sub">{{ metric.sub }}</p>
  </div>
</template>

<style scoped>
.metric-number {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              filter 0.4s ease;
  filter: blur(2.5px);
  transform: scale(0.96);
}
.metric-number.settled {
  filter: blur(0);
  transform: scale(1);
}
.metric-label,
.metric-sub {
  opacity: 0;
  transition: opacity 0.6s ease 0.2s;
}
.metric.is-done .metric-label,
.metric.is-done .metric-sub {
  opacity: 1;
}
</style>
