"use client"

import { ArrowRight, Calculator } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { CTAButton, StatCard } from "@/components/common"
import { PLATFORM_STATS } from "@/constants/platform"

export function PlatformHeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-mint-light via-transparent to-transparent" />
      <div className="absolute top-20 left-0 w-96 h-96 bg-mint/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <AnimatedSection>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-mint animate-pulse" />
                <span className="text-sm font-medium text-mint">
                  B2B/B2C 중개 플랫폼
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight break-keep">
                공간 운영을 연결하는
                <br />
                <span className="text-mint">청소 중개</span>
                <br />
                플랫폼
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg break-keep">
                링키 플랫폼은 공간 대여 업자와 긱워커를 연결하는 B2B/B2C 중개형
                플랫폼입니다. 공간 운영의 번거로움을 줄이고, 사람에게는 안정적인
                일과 기회를 제공합니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton size="lg" ctaVariant="mint">
                  공간 운영자로 시작하기
                  <ArrowRight className="ml-2 w-4 h-4" />
                </CTAButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-transform hover:scale-105 bg-transparent"
                >
                  긱워커로 등록하기
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="flex gap-8 pt-8 border-t border-border">
                {PLATFORM_STATS.map((stat, index) => (
                  <StatCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    accentColor="mint"
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right" delay={200}>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden group">
                <img
                  src="/modern-mobile-app-interface-showing-cleaning-servi.jpg"
                  alt="링키 플랫폼 앱"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
