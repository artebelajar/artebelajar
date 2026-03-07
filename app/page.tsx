"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { IntroSection } from "@/components/home/intro-section"
import { SkillsSection } from "@/components/home/skills-section"
import { ProjectsShowcase } from "@/components/home/projects-showcase"
import { TimelineSection } from "@/components/home/timeline-section"

export default function HomePage() {
  return (
    <div className="page-enter min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <SkillsSection />
        <ProjectsShowcase />
        <TimelineSection />
      </main>
      <Footer />
    </div>
  )
}
