import {
  PlatformHeroSection,
  ProblemSection,
  SolutionSection,
  HowItWorksSection,
  EstimateCalculatorSection,
  ExtendedFeaturesSection,
  PlatformCTASection,
} from "@/components/platform"

export default function PlatformPage() {
  return (
    <main className="min-h-screen">
      <PlatformHeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <EstimateCalculatorSection />
      <ExtendedFeaturesSection />
      <PlatformCTASection />
    </main>
  )
}
