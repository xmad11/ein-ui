"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"

export interface WidgetCarouselProps {
  children: React.ReactNode[]
  className?: string
  gap?: "none" | "sm" | "md" | "lg"
}

export function WidgetCarousel({ children, className = "", gap = "md" }: WidgetCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  })

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit()
  }, [emblaApi])

  const gapClasses = {
    none: "",
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8",
  }

  return (
    <div className={`relative max-w-6xl mx-auto ${className}`}>
      <div className="overflow-hidden px-2" ref={emblaRef}>
        <div className={`flex ${gapClasses[gap]}`}>
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 flex justify-center"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
