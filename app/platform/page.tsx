import {
  PlatformHeroSection,
  ProblemSection,
  SolutionSection,
  HowItWorksSection,
  PackagesSection,
  EstimateCalculatorSection,
  ExtendedFeaturesSection,
  TestimonialsSection,
  PlatformCTASection,
} from "@/components/platform"

export default function PlatformPage() {
  return (
    <main className="min-h-screen">
      <PlatformHeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <PackagesSection />
      <EstimateCalculatorSection />
      <ExtendedFeaturesSection />
      <TestimonialsSection />
      <PlatformCTASection />
    </main>
  )
}
