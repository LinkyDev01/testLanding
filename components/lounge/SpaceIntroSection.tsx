"use client"

import Image from "next/image"
import { AnimatedSection } from "@/components/animated-section"

export function SpaceIntroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/linky-lounge/gallary/intro.jpg"
          alt="링키 라운지 공간"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4">
        <AnimatedSection>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-6">
            Where we link,
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex justify-center">
            <Image
              src="/logos/linky_lounge_logo_white.svg"
              alt="Linky Lounge"
              width={200}
              height={189}
              className="w-32 sm:w-40 md:w-48 h-auto"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
