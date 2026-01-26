"use client"

import { Star, Quote } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/common"

const testimonials = [
  {
    name: "김OO 대표",
    company: "논현동 스터디카페 운영 3년차",
    rating: 5,
    content:
      "매일 아침 30분씩 정리하던 시간이 완전히 사라졌어요. 이제는 그 시간에 마케팅이나 고객 응대에 집중할 수 있게 되었습니다. 링키 덕분에 매출이 20% 올랐어요",
  },
  {
    name: "박OO 대표",
    company: "강남역 파티룸 운영 1년차",
    rating: 5,
    content:
      "청소업체는 너무 비싸고, 알바를 쓰자니 관리가 어려웠는데 링키는 필요할 때만 부를 수 있어서 정말 편해요. 비용도 절반 이하로 줄었습니다.",
  },
  {
    name: "이OO 대표",
    company: "역삼동 무인 스터디카페 2년차",
    rating: 5,
    content:
      "무인으로 운영하다 보니 정리 때문에 매번 직접 가야 했는데, 이제는 링키에서 완벽하게 처리해주셔서 온전히 사업에만 집중할 수 있게 되었습니다.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Testimonials"
            title="고객 후기"
            description="링키와 함께 변화를 경험한 분들의 이야기"
            labelColor="mint"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <div className="relative bg-background border border-border rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-mint/50">
                <Quote className="w-10 h-10 text-mint/20 absolute top-6 right-6" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-foreground flex-1 mb-6 break-keep leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
