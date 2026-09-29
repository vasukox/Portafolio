import { ref, onMounted, onUnmounted } from 'vue'

export function useReveal(options = {}) {
  const { threshold = 0.15, once = true, rootMargin = '0px 0px -10% 0px' } = options
  const isVisible = ref(false)
  const el = ref(null)
  let observer = null

  onMounted(() => {
    if (!el.value) return
    if (typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once && observer && el.value) observer.unobserve(el.value)
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { el, isVisible }
}
