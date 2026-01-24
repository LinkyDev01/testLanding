"use client"

import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader, ProcessStep } from "@/components/common"
import { HOW_IT_WORKS } from "@/constants/platform"

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="How It Works"
            title="간단한 4단계 프로세스"
            titleColor="white"
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((item, index) => (
            <AnimatedSection key={index} delay={index * 150} direction="fade">
              <ProcessStep
                step={item.step}
                title={item.title}
                description={item.description}
                variant="white"
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
