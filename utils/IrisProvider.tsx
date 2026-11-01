'use client'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { animate, motion, useMotionTemplate, useMotionValue } from 'motion/react'

type NavigateFn = (href: string, e: React.MouseEvent<HTMLElement>) => void

const IrisContext = createContext<NavigateFn>(() => {})
export const useIris = () => useContext(IrisContext)

const EASE = [0.76, 0, 0.24, 1] as const
const DURATION = 0.7

export default function IrisProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const busy = useRef(false)
  const waiting = useRef(false)

  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const radius = useMotionValue(0)
  const clipPath = useMotionTemplate`circle(${radius}px at ${cx}px ${cy}px)`

  const navigate = useCallback<NavigateFn>(
    async (href, e) => {
      if (busy.current || href === pathname) return

      // Skip the animation for users who prefer reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href)
        return
      }

      busy.current = true

      // Click position (keyboard-triggered clicks report 0,0, so use the element's center)
      let x = e.clientX
      let y = e.clientY
      if (e.detail === 0) {
        const r = e.currentTarget.getBoundingClientRect()
        x = r.left + r.width / 2
        y = r.top + r.height / 2
      }

      // Radius needed to reach the farthest corner of the viewport
      const maxR = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      cx.set(x)
      cy.set(y)
      radius.set(0)
      setVisible(true)

      await animate(radius, maxR, { duration: DURATION, ease: EASE })

      waiting.current = true
      router.push(href)
    },
    [pathname, router, cx, cy, radius]
  )

  // When the new route has committed, close the iris to reveal it
  useEffect(() => {
    if (!waiting.current) return
    waiting.current = false

    animate(radius, 0, { duration: DURATION, ease: EASE, delay: 0.1 }).then(() => {
      setVisible(false)
      busy.current = false
    })
  }, [pathname, radius])

  return (
    <IrisContext.Provider value={navigate}>
      {children}
      {visible && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-100 bg-[#d5e0f0]"
          style={{ clipPath }}
        />
      )}
    </IrisContext.Provider>
  )
}