"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useCallback, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

  // Responsive width classes based on itemsPerView
  const getWidthClass = () => {
    const base = itemsPerView.base ?? 1
    const sm = itemsPerView.sm ?? base
    const md = itemsPerView.md ?? sm
    const lg = itemsPerView.lg ?? md
    const xl = itemsPerView.xl ?? lg

    return `flex-[0_0_${100/base}%] sm:flex-[0_0_${100/sm}%] md:flex-[0_0_${100/md}%] lg:flex-[0_0_${100/lg}%] xl:flex-[0_0_${100/xl}%]`
  }

  const gapClasses = {
    none: "gap-0",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden px-1" ref={emblaRef}>
        <div className={`flex ${gapClasses[gap]}`}>
          {children.map((child, index) => (
            <div
              key={index}
              className={`${getWidthClass()} min-w-0 flex justify-center`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && children.length > (itemsPerView.xl ?? 4) && (
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
