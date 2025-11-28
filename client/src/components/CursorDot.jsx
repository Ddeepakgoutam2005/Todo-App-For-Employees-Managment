import { useEffect, useRef } from 'react'

export default function CursorDot() {
  const dotRef = useRef(null)
  const last = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = dotRef.current
    let raf = 0
    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const onMove = (e) => {
      const dx = e.clientX - last.current.x
      const dy = e.clientY - last.current.y
      const mag = Math.hypot(dx, dy) || 1
      const ux = dx / mag
      const uy = dy / mag
      target.x = e.clientX + ux * 10
      target.y = e.clientY + uy * 10
      last.current.x = e.clientX
      last.current.y = e.clientY
    }
    const loop = () => {
      const rect = el.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const nx = x + (target.x - x) * 0.2
      const ny = y + (target.y - y) * 0.2
      el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" />
}