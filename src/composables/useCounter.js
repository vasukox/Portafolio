import { ref, watch, onMounted, onUnmounted } from 'vue'

export function useCounter(source, options = {}) {
  const {
    duration = 1800,
    decimals = 0,
    startOnVisible = true,
    delay = 0,
  } = options

  const value = ref(0)
  const phase = ref('idle') // 'idle' | 'running' | 'done'
  const el = ref(null)

  let observer = null
  let started = false
  let delayTimer = null

  const easeOutBack = (t) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  }

  const run = () => {
    if (started) return
    const target = typeof source === 'function' ? source.value : source
    if (typeof target !== 'number' || isNaN(target)) return
    started = true

    delayTimer = setTimeout(() => {
      phase.value = 'running'
      const start = performance.now()
      const tick = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutBack(progress)
        value.value = Number((eased * target).toFixed(decimals))
        if (progress < 1) {
          requestAnimationFrame(tick)
        } else {
          value.value = target
          phase.value = 'done'
        }
      }
      requestAnimationFrame(tick)
    }, delay)
  }

  onMounted(() => {
    if (!startOnVisible) {
      run()
      return
    }
    if (!el.value || typeof IntersectionObserver === 'undefined') {
      run()
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    if (delayTimer) clearTimeout(delayTimer)
  })

  return { value, el, phase }
}
