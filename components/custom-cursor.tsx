"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    let mouseX = 0
    let mouseY = 0
    let trailX = 0
    let trailY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
    }

    const animate = () => {
      trailX += (mouseX - trailX) * 0.15
      trailY += (mouseY - trailY) * 0.15
      trail.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`
      requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      cursor.style.width = "16px"
      cursor.style.height = "16px"
      cursor.style.background = "var(--neon)"
      trail.style.width = "50px"
      trail.style.height = "50px"
    }

    const onMouseLeaveLink = () => {
      cursor.style.width = "12px"
      cursor.style.height = "12px"
      cursor.style.background = "var(--neon)"
      trail.style.width = "40px"
      trail.style.height = "40px"
    }

    window.addEventListener("mousemove", onMouseMove)
    animate()

    const links = document.querySelectorAll("a, button, [role='button']")
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink)
      link.addEventListener("mouseleave", onMouseLeaveLink)
    })

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll("a, button, [role='button']")
      newLinks.forEach((link) => {
        link.addEventListener("mouseenter", onMouseEnterLink)
        link.addEventListener("mouseleave", onMouseLeaveLink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      observer.disconnect()
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink)
        link.removeEventListener("mouseleave", onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-3 w-3 rounded-full md:block"
        style={{
          background: "var(--neon)",
          boxShadow: "0 0 10px var(--neon), 0 0 20px var(--neon)",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-10 w-10 rounded-full md:block"
        style={{
          border: "1px solid var(--neon)",
          opacity: 0.4,
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </>
  )
}
