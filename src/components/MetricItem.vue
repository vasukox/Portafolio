<script setup>
import { computed } from 'vue'
import { useCounter } from '../composables/useCounter.js'
import SlotNumber from './SlotNumber.vue'

const props = defineProps({
  metric: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { value, phase, el } = useCounter(props.metric.value, {
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
      'metric flex flex-col gap-2',
      phase === 'done' ? 'is-done' : '',
    ]"
  >
    <div
      :class="[
        'metric-number display text-6xl md:text-7xl xl:text-8xl leading-none flex items-baseline gap-1',
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
        :target="metric.value"
      />
      <span class="text-paper/60 text-3xl md:text-4xl">{{ metric.suffix }}</span>
    </div>
    <p class="display text-lg md:text-xl mt-3 metric-label">{{ metric.label }}</p>
    <p class="label-italic text-sm opacity-70 metric-sub">{{ metric.sub }}</p>
  </div>
</template>

<style scoped>
.metric-number { font-variant-numeric: tabular-nums; }
</style>
