import test from 'node:test'
import assert from 'node:assert/strict'
import { createRenderer, toRaw } from 'vue'
import { useCounter } from '../src/composables/useCounter.js'

const renderer = createRenderer({
  createElement: () => ({}), insert() {}, remove() {}, patchProp() {},
  setElementText() {}, createText: () => ({}), createComment: () => ({}),
  setText() {}, setComment() {}, parentNode() {}, nextSibling() {},
})

function mount(reduced = false) {
  let enter, callback, observed
  globalThis.window = { matchMedia: () => ({ matches: reduced }) }
  globalThis.IntersectionObserver = class {
    constructor(fn) { enter = fn }
    observe(el) { observed = el }
    disconnect() {}
  }
  globalThis.requestAnimationFrame = fn => { callback = fn; return 42 }
  globalThis.cancelAnimationFrame = () => {}
  let counter
  const element = {}
  const app = renderer.createApp({ setup() {
    counter = useCounter(() => 99.8, { duration: 1000, decimals: 1 })
    counter.el.value = element
    return () => null
  } })
  app.mount({})
  return { counter, app, enter: () => enter([{ isIntersecting: true }]),
    tick: time => callback(time), observed: () => observed,
    element }
}

test('starts only on visibility and settles without overshooting', async () => {
  const m = mount()
  assert.equal(toRaw(m.observed()), m.element)
  assert.equal(m.counter.phase.value, 'idle')
  assert.equal(m.counter.value.value, 0)
  m.enter()
  await new Promise(resolve => setTimeout(resolve, 5))
  const now = performance.now()
  m.tick(now + 400)
  assert.ok(m.counter.value.value > 0 && m.counter.value.value < 99.8)
  m.tick(now + 1100)
  assert.equal(m.counter.value.value, 99.8)
  assert.equal(m.counter.phase.value, 'done')
  m.app.unmount()
})

test('reduced motion shows the final value immediately', () => {
  const m = mount(true)
  m.enter()
  assert.equal(m.counter.value.value, 99.8)
  assert.equal(m.counter.phase.value, 'done')
  m.app.unmount()
})

test('unmount cancels an active animation frame', async () => {
  const m = mount()
  m.enter()
  await new Promise(resolve => setTimeout(resolve, 5))
  let cancelled
  globalThis.cancelAnimationFrame = id => { cancelled = id }
  m.app.unmount()
  assert.equal(cancelled, 42)
})
