"use client"

import { Building, Users } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/common"
import { FOR_BUSINESSES, FOR_WORKERS } from "@/constants/platform"

export function SolutionSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Our Solutions"
            title="링키케어의 솔루션"
            labelColor="mint"
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* For Businesses */}
          <AnimatedSection direction="left">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-mint flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold break-keep">공간 운영자를 위한</h3>
              </div>
              <div className="space-y-6">
                {FOR_BUSINESSES.map((feature, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-mint-light flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-mint/20">
                      <feature.icon className="w-6 h-6 text-mint" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 break-keep">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm break-keep">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* For Workers */}
          <AnimatedSection direction="right" delay={200}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-mint flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold break-keep">링키 파트너를 위한</h3>
              </div>
              <div className="space-y-6">
                {FOR_WORKERS.map((feature, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-mint-light flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-mint/20">
                      <feature.icon className="w-6 h-6 text-mint" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 break-keep">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm break-keep">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
