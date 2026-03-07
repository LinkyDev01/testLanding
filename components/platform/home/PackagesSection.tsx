"use client"

import { Check, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/common"
import { cn } from "@/lib/utils"

type Package = {
  name: string
  price: number
  features: string[]
  areaMultiplier: number
  popular?: boolean
}

const packages: Record<string, Package> = {
  basic: {
    name: "Basic",
    price: 12000,
    features: ["간단한 정리정돈만 필요한 경우"],
    areaMultiplier: 200,
  },
  standard: {
    name: "Standard",
    price: 18000,
    features: ["고객이 기본적인 정리를 마치고 퇴실한 경우"],
    areaMultiplier: 500,
    popular: true,
  },
  premium: {
    name: "Premium",
    price: 35000,
    features: ["고객이 뒷정리 없이 그대로 퇴실한 경우"],
    areaMultiplier: 1000,
  },
}

export function PackagesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Packages"
            title="청소 패키지 소개"
            description="공간과 상황에 맞는 최적의 청소 패키지를 선택하세요"
            labelColor="mint"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {Object.entries(packages).map(([key, pkg], index) => (
            <AnimatedSection key={key} delay={index * 150}>
              <div
                className={cn(
                  "relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-xl",
                  pkg.popular
                    ? "bg-mint text-white shadow-lg scale-105"
                    : "bg-background border border-border hover:border-mint/50"
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-white border border-mint text-mint px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      <Sparkles className="w-4 h-4" />
                      인기
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{pkg.price.toLocaleString()}</span>
                    <span className={cn("text-sm", pkg.popular ? "text-white/80" : "text-muted-foreground")}>원~</span>
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                            pkg.popular ? "bg-white/20" : "bg-mint/10"
                          )}
                        >
                          <Check className={cn("w-3 h-3", pkg.popular ? "text-white" : "text-mint")} />
                        </div>
                        <span className={cn("text-sm break-keep", pkg.popular ? "text-white/90" : "text-foreground")}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
