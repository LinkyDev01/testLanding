"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { CTAButton, StatCard } from "@/components/common"
import { trackCustom } from "@/lib/meta-pixel"

export function HeroSection() {
  return (
    <section data-track-section="hero" className="relative min-h-screen flex items-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-mustard/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <AnimatedSection delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light rounded-full">
                <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
                <span className="text-sm text-rose font-medium">
                  사람과 사람을 연결합니다
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                사람과 사람을 잇는
                <br />
                <span className="text-sage">공간</span>과{" "}
                <span className="text-mint">플랫폼</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Linky는 오프라인 공간과 온라인 플랫폼을 통해 사람, 공간, 일을
                유기적으로 연결하는 라이프스타일 기반 서비스입니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  size="lg"
                  ctaVariant="sage"
                  onClick={() => trackCustom("ClickCTA", { button: "learn_services" })}
                >
                  서비스 알아보기
                  <ArrowRight className="ml-2 w-4 h-4" />
                </CTAButton>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="transition-transform hover:scale-105 bg-transparent"
                  onClick={() => trackCustom("ClickCTA", { button: "contact" })}
                >
                  <Link href="#contact">문의하기</Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={400}>
              <div className="flex gap-8 pt-8 border-t border-border">
                <StatCard value="50+" label="성공적인 모임" accentColor="sage" />
                {/* <StatCard value="200+" label="파트너 공간" accentColor="mint" /> */}
                <StatCard value="100%" label="고객 만족도" accentColor="mustard" />
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Image Grid */}
          <AnimatedSection direction="right" delay={200}>
            <div className="relative grid grid-cols-2 gap-4">
              <Link href="/lounge" className="space-y-4 block cursor-pointer">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden group">
                  <img
                    src="/main/main02.jpeg"
                    alt="링키 라운지 공간"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="aspect-square rounded-2xl bg-sage overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <img src="/main/main03.png" alt="링키 플랫폼 로고" className="w-full h-full object-cover" />
                </div>
              </Link>
              <Link href="/platform" className="space-y-4 block cursor-pointer">
                <div className="space-y-4 pt-0 md:pt-8">
                  <div className="aspect-square rounded-2xl bg-mint overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <img src="/main/main04.svg" alt="링키 플랫폼 로고" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-4/5 rounded-2xl overflow-hidden group">
                    <img
                      src="/main/main01.png"
                      alt="링키 플랫폼 서비스"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
