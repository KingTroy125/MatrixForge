"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LensProps {
  children: React.ReactNode
  zoomFactor?: number
  lensSize?: number
  isStatic?: boolean
  ariaLabel?: string
  className?: string
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 2,
  lensSize = 150,
  isStatic = false,
  ariaLabel = "Magnifying lens",
  className,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {children}
      
      {(isHovering || isStatic) && (
        <div
          className="absolute pointer-events-none border-2 border-white rounded-full overflow-hidden bg-white shadow-lg"
          style={{
            width: lensSize,
            height: lensSize,
            left: mousePosition.x - lensSize / 2,
            top: mousePosition.y - lensSize / 2,
            transform: `scale(${isHovering ? 1 : 0})`,
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoomFactor}) translate(${
                -(mousePosition.x - lensSize / 2) * (zoomFactor - 1) / zoomFactor
              }px, ${
                -(mousePosition.y - lensSize / 2) * (zoomFactor - 1) / zoomFactor
              }px)`,
              transformOrigin: "0 0",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}