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

            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight break-keep">
                파티룸·에어비앤비
                <br />
                <span className="text-mint">청소 서비스</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg break-keep">
                파티룸·에어비앤비 사장님의 청소 걱정, 링키케어가 대신합니다.  체계적인 청소 관리로 사장님은 매출에만 집중하세요.
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
                  링키 파트너로 등록하기
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
                  alt="링키케어 앱"
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
