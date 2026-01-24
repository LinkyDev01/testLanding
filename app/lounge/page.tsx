import {
  LoungeHeroSection,
  LoungeFeaturesSection,
  MeetupCalendarSection,
  SpaceSection,
  GoalsSection,
  LoungeCTASection,
} from "@/components/lounge"

export default function LoungePage() {
  return (
    <main className="min-h-screen">
      <LoungeHeroSection />
      <LoungeFeaturesSection />
      <MeetupCalendarSection />
      <SpaceSection />
      <GoalsSection />
      <LoungeCTASection />
    </main>
  )
}
