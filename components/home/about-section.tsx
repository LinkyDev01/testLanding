"use client"

import { Target, Heart, Lightbulb } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/common"
import type { BrandColor } from "@/types"

const values: {
  icon: typeof Heart
  color: BrandColor
  title: string
  description: string
}[] = [
  {
    icon: Heart,
    color: "sage",
    title: "연결의 가치",
    description:
      "사람과 사람, 공간과 서비스를 자연스럽게 연결하여 새로운 가치를 창출합니다.",
  },
  {
    icon: Target,
    color: "mint",
    title: "목적 있는 만남",
    description: "단순한 공간 대여를 넘어, 의미 있는 만남과 경험을 제공합니다.",
  },
  {
    icon: Lightbulb,
    color: "mustard",
    title: "안정적인 기회",
    description:
      "공간 운영의 번거로움을 줄이고, 사람에게는 안정적인 일과 기회를 제공합니다.",
  },
]

const colorStyles: Record<BrandColor, { bg: string; text: string }> = {
  sage: { bg: "bg-sage-light", text: "text-sage" },
  mint: { bg: "bg-mint-light", text: "text-mint" },
  rose: { bg: "bg-rose-light", text: "text-rose" },
  mustard: { bg: "bg-mustard-light", text: "text-mustard" },
}

export function AboutSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <AnimatedSection>
              <SectionHeader
                label="About Linky"
                title="모임이 필요한 사람에게는 경험의 공간을, 공간을 운영하는 사람에게는 연결을 제공합니다"
                labelColor="rose"
                align="left"
              />
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Linky는 오프라인 공간과 온라인 플랫폼을 통해 사람, 공간, 일을
                유기적으로 연결하는 라이프스타일 기반 서비스입니다. 우리는
                사람들이 "또 오고 싶은 공간", "사람을 만나는 이유가 있는 공간"을
                만드는 것을 목표로 합니다.
              </p>
            </AnimatedSection>

            {/* Values */}
            <div className="space-y-6">
              {values.map((item, index) => {
                const styles = colorStyles[item.color]
                return (
                  <AnimatedSection
                    key={index}
                    delay={200 + index * 100}
                    direction="left"
                  >
                    <div className="flex gap-4 group cursor-default">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${styles.bg}`}
                      >
                        <item.icon className={`w-6 h-6 ${styles.text}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 transition-colors group-hover:text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>

          {/* Image */}
          <AnimatedSection direction="right" delay={200}>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden group">
                <img
                  src="/diverse-group-of-people-networking-and-connecting-.jpg"
                  alt="Linky 커뮤니티"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-xl border border-border animate-bounce [animation-duration:3s]">
                <p className="text-4xl font-bold text-sage">3+</p>
                <p className="text-muted-foreground">Years of Connection</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
