"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/common"

const PROGRAMS = [
  {
    id: 1,
    title: "회화 스터디",
    image: "/linky-lounge/foreign_class.png",
    schedule: "매주 월화 저녁 1시간 반 진행",
    description: "외국어 회화 실력을 함께 키워가는 스터디",
    link: "https://linky-study-homepage.vercel.app/",
  },
  {
    id: 2,
    title: "와인 파티",
    image: "/linky-lounge/wine_party.png",
    schedule: "매주 금토 3시간 진행",
    description: "와인과 함께하는 특별한 네트워킹",
    link: "https://linky-wine-party01.vercel.app/",
  },
  {
    id: 3,
    title: "몰입의 밤",
    image: "/linky-lounge/focus_night.png",
    schedule: "매주 목 3시간 진행",
    description: "집중과 몰입을 위한 조용한 시간",
    link: "https://focus-night.vercel.app/",
  },
]

export function ProgramsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const len = PROGRAMS.length

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + len) % len)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % len)
  }

  // 드래그 핸들러
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - startX
    setDragOffset(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (dragOffset > 80) {
      handlePrev()
    } else if (dragOffset < -80) {
      handleNext()
    }
    setDragOffset(0)
  }

  // 원형 거리 계산 (무한 루프를 위해)
  const getCircularDiff = (index: number) => {
    let diff = index - activeIndex

    // 최단 거리로 계산 (무한 루프)
    if (diff > len / 2) diff -= len
    if (diff < -len / 2) diff += len

    return diff
  }

  const getItemStyle = (index: number) => {
    const diff = getCircularDiff(index)
    const offsetX = dragOffset * 0.3

    // 양쪽에 1개씩만 표시
    if (Math.abs(diff) > 1) {
      return {
        transform: `translateX(calc(-50% + ${diff > 0 ? 400 : -400}px)) scale(0.7)`,
        zIndex: 0,
        opacity: 0,
        pointerEvents: "none" as const,
        transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }
    }

    const baseTranslate = diff * 300 + offsetX
    const scale = diff === 0 ? 1 : 0.85
    const rotateY = diff * -3
    const zIndex = diff === 0 ? 10 : 5
    const blur = diff === 0 ? 0 : 2
    const opacity = diff === 0 ? 1 : 0.7

    return {
      transform: `translateX(calc(-50% + ${baseTranslate}px)) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      opacity,
      transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
    }
  }

  return (
    <section className="py-24 bg-[#d5d2ce] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Programs We Offer"
            title="어떤 모임을 제공하나요?"
            description="링키 라운지에서 진행하는 다양한 프로그램을 만나보세요"
            labelColor="sage"
          />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          {/* 3D Slider */}
          <div
            ref={sliderRef}
            className="relative h-[580px] md:h-[620px] cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Cards */}
            <div className="relative h-full">
              {PROGRAMS.map((program, index) => (
                <div
                  key={program.id}
                  className="absolute left-1/2 top-0 w-[240px] md:w-[280px]"
                  style={getItemStyle(index)}
                  onClick={() => !isDragging && setActiveIndex(index)}
                >
                  <ProgramCard program={program} isActive={index === activeIndex} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:scale-110 transition-all duration-300"
              aria-label="이전"
            >
              <ChevronLeft className="w-10 h-10" strokeWidth={2} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:scale-110 transition-all duration-300"
              aria-label="다음"
            >
              <ChevronRight className="w-10 h-10" strokeWidth={2} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {PROGRAMS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[#00c896] w-6"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

interface ProgramCardProps {
  program: (typeof PROGRAMS)[number]
  isActive: boolean
}

function ProgramCard({ program, isActive }: ProgramCardProps) {
  return (
    <div className="programs-card bg-white rounded-2xl overflow-hidden shadow-2xl">
      {/* Poster Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Content Below Image */}
      <div className="p-5 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>

        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{program.schedule}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>

        {/* CTA Button */}
        <a
          href={program.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center w-full py-2.5 px-4 bg-[#00c896] hover:bg-[#00b085] text-white text-sm font-medium rounded-xl transition-all duration-300 ${
            isActive ? "opacity-100" : "opacity-70"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          자세히 알아보기
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
