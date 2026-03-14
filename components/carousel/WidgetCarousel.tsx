"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useCallback, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface WidgetCarouselProps {
  children: React.ReactNode[]
  className?: string
  gap?: "none" | "sm" | "md" | "lg"
  showNavigation?: boolean
  /**
   * Number of items to show at different breakpoints
   * Default: { base: 1, sm: 2, lg: 3, xl: 4 }
   */
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
  gap = "md",
  showNavigation = true,
  itemsPerView = { base: 1, sm: 2, lg: 3, xl: 4 }
}: WidgetCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView.base ?? 1)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

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

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  const gapClasses = {
    none: "gap-0",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  }

  const itemWidthPercent = 100 / currentItemsPerView

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden px-1" ref={emblaRef}>
        <div className={cn("flex", gapClasses[gap])}>
          {children.map((child, index) => (
            <div
              key={index}
              className="min-w-0 flex-shrink-0 flex justify-center"
              style={{ flex: `0 0 ${itemWidthPercent}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && children.length > currentItemsPerView && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  )
}
