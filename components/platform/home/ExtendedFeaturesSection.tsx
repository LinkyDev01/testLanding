"use client"

import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader, FeatureCard } from "@/components/common"
import { EXTENDED_FEATURES } from "@/constants/platform"

export function ExtendedFeaturesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Extended Features"
            title="운영 관리 기능"
            labelColor="mint"
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-6">
          {EXTENDED_FEATURES.map((item, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                accentColor="mint"
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
