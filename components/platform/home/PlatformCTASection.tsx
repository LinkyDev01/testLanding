"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { CTAButton } from "@/components/common"

export function PlatformCTASection() {
  return (
    <section className="py-24 bg-secondary/50">
      <AnimatedSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance break-keep">
          링키케어과 함께
          <br />
          공간 운영을 더 쉽게
        </h2>
        <p className="text-muted-foreground mb-8 break-keep">
          공간 운영자든 링키 파트너든, 링키케어이 연결해 드립니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton size="lg" ctaVariant="mint">
            지금 시작하기
            <ArrowRight className="ml-2 w-4 h-4" />
          </CTAButton>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="transition-transform hover:scale-105 bg-transparent"
          >
            <Link href="/#contact">문의하기</Link>
          </Button>
        </div>
      </AnimatedSection>
    </section>
  )
}
