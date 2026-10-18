import { ref, onMounted, onUnmounted } from 'vue'

export function useMagnetic(strength = 12) {
  const el = ref(null)
  const offset = ref({ x: 0, y: 0 })

  let target = null

  const onMove = (e) => {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = el.value.getBoundingClientRect()
    const dx = e.clientX - rect.left - rect.width / 2
    const dy = e.clientY - rect.top - rect.height / 2
    const norm = Math.max(rect.width, rect.height)
    offset.value = {
      x: (dx / norm) * strength,
      y: (dy / norm) * strength,
    }
  }

  const onLeave = () => {
    offset.value = { x: 0, y: 0 }
  }

  onMounted(() => {
    target = el.value
    if (!target) return
    target.addEventListener('mousemove', onMove)
    target.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    if (!target) return
    target.removeEventListener('mousemove', onMove)
    target.removeEventListener('mouseleave', onLeave)
  })

  return { el, offset }
}
