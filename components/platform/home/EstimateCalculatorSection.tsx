"use client"

import Link from "next/link"
import { Calculator, ArrowRight, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

export function EstimateCalculatorSection() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-mint/10 via-mint/5 to-transparent border border-mint/20 p-8 sm:p-12">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-mint/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-mint/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-mint/20 flex items-center justify-center mb-6">
                <Calculator className="w-8 h-8 text-mint" />
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 break-keep">
                청소 비용이 궁금하신가요?
              </h2>

              {/* Description */}
              <p className="text-muted-foreground max-w-md mb-8 break-keep">
                패키지 선택부터 추가 옵션까지, 몇 번의 클릭만으로 예상 비용을 확인해보세요
              </p>

              {/* CTA Button */}
              <Link href="/platform/calculator">
                <Button
                  size="lg"
                  className="bg-mint hover:bg-mint/90 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-mint/25 hover:shadow-xl hover:shadow-mint/30 transition-all"
                >
                  <Calculator className="mr-2 w-5 h-5" />
                  요금 계산기 시작하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
