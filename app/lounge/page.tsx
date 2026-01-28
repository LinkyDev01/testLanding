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
      <MeetupCalendarSection />
      <LoungeHeroSection />
      <LoungeFeaturesSection />
      <SpaceSection />
      <GoalsSection />
      <LoungeCTASection />
    </main>
  )
}
