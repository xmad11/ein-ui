"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

export interface WidgetCarouselProps {
  children: React.ReactNode[]
  className?: string
  /** Gap between items - default is 12px (sm) */
  gap?: "none" | "xs" | "sm" | "md"
  /** Number of items to show at different breakpoints */
  itemsPerView?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function WidgetCarousel({
  children,
  className = "",
  gap = "sm",
  itemsPerView = { base: 1, sm: 2, lg: 3, xl: 4 }
}: WidgetCarouselProps) {
  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView.base ?? 1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Gap sizes in pixels
  const gapSizes = {
    none: 0,
    xs: 8,
    sm: 12,
    md: 16,
  }

  // Handle responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth
      if (width >= 1280) {
        setCurrentItemsPerView(itemsPerView.xl ?? itemsPerView.lg ?? itemsPerView.md ?? itemsPerView.sm ?? itemsPerView.base ?? 1)
      } else if (width >= 1024) {
        setCurrentItemsPerView(itemsPerView.lg ?? itemsPerView.md ?? itemsPerView.sm ?? itemsPerView.base ?? 1)
      } else if (width >= 768) {
        setCurrentItemsPerView(itemsPerView.md ?? itemsPerView.sm ?? itemsPerView.base ?? 1)
      } else if (width >= 640) {
        setCurrentItemsPerView(itemsPerView.sm ?? itemsPerView.base ?? 1)
      } else {
        setCurrentItemsPerView(itemsPerView.base ?? 1)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [itemsPerView])

  const gapPx = gapSizes[gap]

  // Calculate item width: (100% - gaps) / itemsPerView
  const totalGapPx = gapPx * (currentItemsPerView - 1)

  return (
    <div className={cn("w-full", className)}>
      {/* Horizontal scroll container with snap scrolling */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex" style={{ gap: `${gapPx}px` }}>
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex-grow-0"
              style={{
                width: `calc((100% - ${totalGapPx}px) / ${currentItemsPerView})`,
                minWidth: `calc((100% - ${totalGapPx}px) / ${currentItemsPerView})`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
