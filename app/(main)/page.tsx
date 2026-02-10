import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { AboutSection } from "@/components/home/about-section"
import { ContactSection } from "@/components/home/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      {/* <AboutSection /> */}
      <ContactSection />
    </main>
  )
}
