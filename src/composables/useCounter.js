import { ref, toValue, onMounted, onUnmounted } from 'vue'

export function useCounter(source, { duration = 1800, decimals = 0, startOnVisible = true, delay = 0 } = {}) {
  const value = ref(0)
  const phase = ref('idle')
  const el = ref(null)
  let observer, timer, frame
  let started = false

  const run = () => {
    const target = toValue(source)
    if (started || !Number.isFinite(target)) return
    started = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || duration <= 0) {
      value.value = target
      phase.value = 'done'
      return
    }
    timer = setTimeout(() => {
      phase.value = 'running'
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min(Math.max((now - start) / duration, 0), 1)
        value.value = Number((target * (1 - (1 - progress) ** 3)).toFixed(decimals))
        if (progress < 1) frame = requestAnimationFrame(tick)
        else { value.value = target; phase.value = 'done' }
      }
      frame = requestAnimationFrame(tick)
    }, delay)
  }
  onMounted(() => {
    if (!startOnVisible || !el.value || typeof IntersectionObserver === 'undefined') return run()
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { run(); observer.disconnect() }
    }, { threshold: 0.3 })
    observer.observe(el.value)
  })
  onUnmounted(() => {
    observer?.disconnect()
    clearTimeout(timer)
    cancelAnimationFrame(frame)
  })
  return { value, phase, el }
}
