"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"

export interface WidgetCarouselProps {
  children: React.ReactNode[]
  className?: string
}

export function WidgetCarousel({ children, className = "" }: WidgetCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  })

  useEffect(() => {
    if (!emblaApi) return
    // Re-initialize on mount
    emblaApi.reInit()
  }, [emblaApi])

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
