<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  words: { type: Array, required: true },
  interval: { type: Number, default: 3000 },
})

const index = ref(0)
const longest = computed(() =>
  Math.max(...props.words.map((w) => w.length))
)

let timer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    index.value = (index.value + 1) % props.words.length
  }, props.interval)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <span class="rotator" :style="{ '--rotator-w': longest + 'ch' }">
    <transition name="roll">
      <span :key="index" class="rotator-word">{{ words[index] }}</span>
    </transition>
  </span>
</template>

<style scoped>
.rotator {
  display: inline-block;
  position: relative;
  width: var(--rotator-w);
  text-align: left;
  vertical-align: baseline;
  overflow: hidden;
  padding-bottom: 0.05em;
}
.rotator-word {
  display: inline-block;
  white-space: nowrap;
  will-change: transform, opacity, filter;
}
.roll-enter-active {
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.6s ease;
}
.roll-leave-active {
  transition:
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.roll-enter-from {
  opacity: 0;
  transform: translateY(80%);
  filter: blur(8px);
}
.roll-leave-to {
  opacity: 0;
  transform: translateY(-80%);
  filter: blur(8px);
}
</style>
