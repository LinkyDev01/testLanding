"use client"

import Image from "next/image"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/common"

const GALLERY_IMAGES = [
  { src: "/linky-lounge/gallary/main.jpg", alt: "메인 공간" },
  { src: "/linky-lounge/gallary/b.jpg", alt: "라운지 공간 B" },
  { src: "/linky-lounge/gallary/c.jpg", alt: "라운지 공간 C" },
  { src: "/linky-lounge/gallary/d.jpg", alt: "라운지 공간 D" },
  { src: "/linky-lounge/gallary/e.jpg", alt: "라운지 공간 E" },
  { src: "/linky-lounge/gallary/f.jpg", alt: "라운지 공간 F" },
  { src: "/linky-lounge/gallary/g.jpg", alt: "라운지 공간 G" },
  { src: "/linky-lounge/gallary/h.jpg", alt: "라운지 공간 H" },
]

export function GallerySection() {
  return (
    <section className="py-24 bg-[#d5d2ce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Our Space"
            title="공간 사진 갤러리"
            description="링키 라운지의 다양한 공간을 미리 만나보세요"
            labelColor="sage"
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <AnimatedSection key={image.src} delay={index * 50}>
              <div className="gallery-item relative aspect-square overflow-hidden rounded-xl group cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
