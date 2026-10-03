// Svelte action: kartu miring tipis mengikuti kursor + titik cahaya (--gx/--gy)
export function tilt(node, max = 5) {
  if (!matchMedia('(hover: hover)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let raf
  const move = (e) => {
    const r = node.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      node.style.transform = `perspective(900px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg) translateY(-4px)`
      node.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
      node.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
    })
  }
  const leave = () => {
    cancelAnimationFrame(raf)
    node.style.transform = ''
  }

  node.addEventListener('pointermove', move)
  node.addEventListener('pointerleave', leave)
  return {
    destroy() {
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
    },
  }
}
