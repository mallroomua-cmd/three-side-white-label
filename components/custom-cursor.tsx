"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only show on devices that likely have a mouse
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!mediaQuery.matches) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest("a, button, [role='button']")
      setIsHovering(!!isLink)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-foreground rounded-full mix-blend-difference transition-transform duration-75"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          transform: isHovering ? "scale(0)" : "scale(1)",
        }}
      />
      {/* Ring */}
      <div
        className="fixed pointer-events-none z-[9999] w-8 h-8 border border-foreground rounded-full mix-blend-difference transition-all duration-200"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          transform: isHovering ? "scale(1.5)" : "scale(1)",
          opacity: isHovering ? 0.8 : 0.5,
        }}
      />
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
