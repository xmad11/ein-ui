"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useCallback, useState } from "react"
import { cn } from "@/lib/utils"

export interface WidgetCarouselProps {
  children: React.ReactNode[]
  className?: string
  /** Gap between items - default is 12px (3) */
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

  // Embla carousel with proper snap behavior
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, // No loop for cleaner snap behavior
    align: "start",
    skipSnaps: false, // Ensure we snap to each item
    dragFree: false, // Disable free dragging
    containScroll: "keepSnaps", // Keep all snaps
  })

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

  // Re-initialize Embla when items per view changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [currentItemsPerView, emblaApi])

  // Gap classes - using smaller values
  const gapClasses = {
    none: "gap-0",
    xs: "gap-2",   // 8px
    sm: "gap-3",   // 12px
    md: "gap-4",   // 16px
  }

  // Calculate item width percentage
  const itemWidthPercent = 100 / currentItemsPerView

  return (
    <div className={cn("w-full select-none", className)}>
      {/* Overflow container - prevents horizontal page scroll */}
      <div
        className="overflow-hidden"
        ref={emblaRef}
        style={{ touchAction: "pan-x" }} // Only allow horizontal touch
      >
        {/* Flex container with gap */}
        <div className={cn("flex", gapClasses[gap])}>
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex-grow-0"
              style={{
                flex: `0 0 ${itemWidthPercent}%`,
                maxWidth: `${itemWidthPercent}%`,
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
