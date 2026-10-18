<script setup>
import { computed } from 'vue'
const props = defineProps({
  value: { type: Number, required: true },
  decimals: { type: Number, default: 0 },
  target: { type: Number, required: true },
})
const formatted = computed(() => Number.isFinite(props.value) ? props.value.toFixed(props.decimals) : '0')
</script>

<template>
  <span class="counter-number"><span class="counter-spacer" aria-hidden="true">{{ target.toFixed(decimals) }}</span><span class="counter-value">{{ formatted }}</span></span>
</template>

<style scoped>
.counter-number { display: inline-grid; font-variant-numeric: tabular-nums; line-height: 1.1; }
.counter-spacer, .counter-value { grid-area: 1 / 1; }
.counter-spacer { visibility: hidden; }
</style>
