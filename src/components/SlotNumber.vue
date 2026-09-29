<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  decimals: { type: Number, default: 0 },
  duration: { type: Number, default: 280 },
})

const formatted = computed(() => {
  const v = Math.max(0, Math.min(props.value, Number('9'.repeat(6))))
  return v.toFixed(props.decimals)
})

const segments = computed(() => {
  return formatted.value.split('').map((char) => {
    if (char === '.') return { type: 'dot' }
    return { type: 'digit', value: parseInt(char, 10) }
  })
})
</script>

<template>
  <span class="slot-number inline-flex items-baseline align-baseline">
    <template v-for="(seg, i) in segments" :key="i">
      <span v-if="seg.type === 'dot'" class="dot">.</span>
      <span
        v-else
        class="digit-slot"
        :style="{ transitionDelay: `${i * 90}ms` }"
      >
        <span
          class="digit-track"
          :style="{
            transform: `translateY(-${seg.value * 10}%)`,
            transitionDuration: `${duration}ms`,
          }"
        >
          <span v-for="n in 10" :key="n" class="digit">{{ n - 1 }}</span>
        </span>
      </span>
    </template>
  </span>
</template>

<style scoped>
.slot-number {
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.digit-slot {
  display: inline-block;
  height: 1em;
  overflow: hidden;
  vertical-align: top;
  line-height: 1;
  position: relative;
}
.dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
}
.digit-track {
  display: flex;
  flex-direction: column;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
  line-height: 1;
}
.digit {
  height: 1em;
  display: block;
  text-align: center;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
</style>
