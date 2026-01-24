"use client"

import { Building, Users, CheckCircle } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/common"
import { BUSINESS_PROBLEMS, WORKER_PROBLEMS } from "@/constants/platform"

export function ProblemSection() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Problems We Solve"
            title="우리가 해결하는 문제"
            labelColor="mint"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For Businesses */}
          <AnimatedSection direction="left" delay={100}>
            <div className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-mint-light flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-mint" />
              </div>
              <h3 className="text-xl font-bold mb-4 break-keep">공간 대여 업자의 고민</h3>
              <ul className="space-y-4">
                {BUSINESS_PROBLEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <CheckCircle className="w-5 h-5 text-mint mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-muted-foreground break-keep">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* For Workers */}
          <AnimatedSection direction="right" delay={200}>
            <div className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-mint-light flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-mint" />
              </div>
              <h3 className="text-xl font-bold mb-4 break-keep">긱워커의 고민</h3>
              <ul className="space-y-4">
                {WORKER_PROBLEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <CheckCircle className="w-5 h-5 text-mint mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-muted-foreground break-keep">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
