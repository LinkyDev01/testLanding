"use client"

import Link from "next/link"
import { ArrowRight, Users, Building, Calendar, Star, MapPin, Clock } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader, CTAButton } from "@/components/common"
import { trackCustom } from "@/lib/meta-pixel"

export function ServicesSection() {
  return (
    <section data-track-section="메인_서비스소개" className="py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Our Services"
            title="연결의 가치를 만들어가는 두 가지 서비스"
            labelColor="rose"
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Linky Lounge Card */}
          <AnimatedSection direction="left" delay={100}>
            <div className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/linky-lounge/gallary/e.jpg"
                  alt="링키라운지"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">링키라운지</h3>
                    <p className="text-sm text-muted-foreground">Linky Lounge</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  사람을 잇는 오프라인 커뮤니티 공간. 단순한 파티룸이 아닌, '목적
                  있는 만남'이 자연스럽게 이루어지는 커뮤니티 라운지입니다.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Calendar, label: "소규모 파티" },
                    { icon: Star, label: "와인 파티" },
                    { icon: Users, label: "독서 모임" },
                    { icon: Building, label: "네트워킹" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-sage"
                    >
                      <item.icon className="w-4 h-4 text-sage" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Brand Colors */}
                {/* <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-6 h-6 rounded-full bg-sage transition-transform hover:scale-125"
                    title="세이지 그린"
                  />
                  <div
                    className="w-6 h-6 rounded-full bg-rose transition-transform hover:scale-125"
                    title="로즈 브라운"
                  />
                  <div
                    className="w-6 h-6 rounded-full bg-mustard transition-transform hover:scale-125"
                    title="머스터드"
                  />
                </div> */}

                <CTAButton
                  asChild
                  className="w-full"
                  ctaVariant="sage"
                  onClick={() => trackCustom("ClickCTA", { button: "서비스_라운지상세" })}
                >
                  <Link href="/lounge">
                    자세히 알아보기
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CTAButton>
              </div>
            </div>
          </AnimatedSection>

          {/* Linky Platform Card */}
          <AnimatedSection direction="right" delay={200}>
            <div className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/professional-cleaning-service-mobile-app-interface.jpg"
                  alt="링키케어"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-mint flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">링키케어</h3>
                    <p className="text-sm text-muted-foreground">Linky Platform</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  공간 운영을 연결하는 청소 중개 플랫폼. 공간 대여 업자와 긱워커를
                  연결하는 B2B/B2C 중개형 플랫폼입니다.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Building, label: "청소 중개" },
                    { icon: Users, label: "긱워커 매칭" },
                    { icon: MapPin, label: "지역 기반" },
                    { icon: Clock, label: "유연한 일정" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-mint"
                    >
                      <item.icon className="w-4 h-4 text-mint" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Brand Color */}
                {/* <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-6 h-6 rounded-full bg-mint transition-transform hover:scale-125"
                    title="민트 그린"
                  />
                </div> */}

                <CTAButton
                  asChild
                  className="w-full"
                  ctaVariant="mint"
                  onClick={() => trackCustom("ClickCTA", { button: "서비스_플랫폼상세" })}
                >
                  <Link href="/platform">
                    자세히 알아보기
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
