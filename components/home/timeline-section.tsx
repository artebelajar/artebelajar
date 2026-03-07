"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { 
  GraduationCap, 
  BookOpen, 
  Code2, 
  Rocket, 
  Sparkles,
  Heart,
  Coffee,
  Target,
  CalendarDays,
  MapPin
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  const milestones = [
    {
      year: "2012 - 2018",
      period: "7 years",
      titleKey: "timeline.m1.title",
      descKey: "timeline.m1.desc",
      icon: BookOpen,
      color: "var(--chart-2)",
      achievements: [
        "First computer at age 7",
        "Learned basic typing",
        "Won school science competition",
      ],
      location: "Elementary School",
    },
    {
      year: "2018 - 2021",
      period: "3 years",
      titleKey: "timeline.m2.title",
      descKey: "timeline.m2.desc",
      icon: GraduationCap,
      color: "var(--chart-3)",
      achievements: [
        "First HTML & CSS code",
        "Built first simple website",
        "Discovered love for technology",
      ],
      location: "Middle School",
    },
    {
      year: "2021 - Present",
      period: "4+ years",
      titleKey: "timeline.m3.title",
      descKey: "timeline.m3.desc",
      icon: Heart,
      color: "var(--primary)",
      achievements: [
        "Memorized 5 Juz of Quran",
        "Balanced religious studies & coding",
        "Found life purpose",
      ],
      location: "PPQIT Al-Mahir",
    },
    {
      year: "2024",
      period: "The Big Leap",
      titleKey: "timeline.m4.title",
      descKey: "timeline.m4.desc",
      icon: Code2,
      color: "var(--neon)",
      achievements: [
        "First JavaScript 'Hello World'",
        "Built 5+ mini projects",
        "Started learning full-stack",
      ],
      location: "Programming Journey",
    },
    {
      year: "2025 - Future",
      period: "∞",
      titleKey: "timeline.m5.title",
      descKey: "timeline.m5.desc",
      icon: Rocket,
      color: "var(--chart-4)",
      achievements: [
        "Master full-stack development",
        "Build 3D web experiences",
        "Inspire other students",
      ],
      location: "The Future",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden py-16 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-background" />
      <div className="cyber-grid absolute inset-0 opacity-20" />
      
      {/* Decorative elements - hidden on mobile */}
      <div className="absolute top-0 left-1/4 h-64 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 animate-pulse hidden md:block" />
      <div className="absolute bottom-0 right-1/4 h-64 w-px bg-gradient-to-t from-primary/0 via-primary/30 to-primary/0 animate-pulse hidden md:block" />
      
      <div ref={sectionRef} className="relative mx-auto max-w-4xl px-4 md:px-6">
        <SectionHeading
          tag={t("timeline.tag")}
          title={t("timeline.title")}
          description={t("timeline.desc")}
        />

        {/* Timeline */}
        <div className="relative mt-10 md:mt-20">
          {/* Timeline line - different positions for mobile and desktop */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent md:left-1/2 md:-translate-x-1/2">
            <div className="absolute inset-0 animate-pulse bg-primary/30 blur-sm" />
          </div>

          {/* Milestones */}
          <div className="relative space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isEven = index % 2 === 0
              
              return (
                <div
                  key={milestone.year}
                  className={`relative transition-all duration-1000 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-20 opacity-100"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  {/* MOBILE LAYOUT - semua konten di sisi kanan */}
                  <div className="flex md:hidden">
                    {/* Timeline node untuk mobile */}
                    <div className="relative flex w-12 flex-shrink-0 items-start justify-center pt-6">
                      <div 
                        className={`absolute h-3 w-3 rounded-full transition-all duration-500 ${
                          activeIndex === index ? 'scale-150' : 'scale-100'
                        }`}
                        style={{
                          backgroundColor: milestone.color,
                          boxShadow: activeIndex === index ? `0 0 20px ${milestone.color}` : 'none',
                        }}
                      />
                    </div>

                    {/* Konten mobile di sisi kanan */}
                    <div className="flex-1 pl-4">
                      <TimelineCard 
                        milestone={milestone}
                        Icon={Icon}
                        isActive={activeIndex === index}
                        t={t}
                        isMobile={true}
                      />
                    </div>
                  </div>

                  {/* DESKTOP LAYOUT - dua sisi bergantian */}
                  <div className="hidden md:flex md:items-center">
                    {/* Konten kiri untuk index genap */}
                    {isEven ? (
                      <>
                        <div className="w-1/2 pr-12 text-right">
                          <TimelineCard 
                            milestone={milestone}
                            Icon={Icon}
                            isActive={activeIndex === index}
                            t={t}
                            isMobile={false}
                            alignRight={true}
                          />
                        </div>
                        <div className="relative flex w-12 items-center justify-center">
                          <TimelineNode 
                            color={milestone.color} 
                            isActive={activeIndex === index} 
                          />
                        </div>
                        <div className="w-1/2" />
                      </>
                    ) : (
                      // Konten kanan untuk index ganjil
                      <>
                        <div className="w-1/2" />
                        <div className="relative flex w-12 items-center justify-center">
                          <TimelineNode 
                            color={milestone.color} 
                            isActive={activeIndex === index} 
                          />
                        </div>
                        <div className="w-1/2 pl-12">
                          <TimelineCard 
                            milestone={milestone}
                            Icon={Icon}
                            isActive={activeIndex === index}
                            t={t}
                            isMobile={false}
                            alignRight={false}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Akhir timeline */}
          <div className="relative mt-8 md:mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 md:gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 md:px-6 md:py-3">
              <Rocket className="h-3 w-3 md:h-4 md:w-4 text-primary animate-bounce" />
              <span className="font-mono text-xs md:text-sm text-primary">The journey continues...</span>
              <Rocket className="h-3 w-3 md:h-4 md:w-4 text-primary animate-bounce" />
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { label: "Years of Learning", value: "5+", icon: BookOpen },
            { label: "Milestones", value: "7", icon: Target },
            { label: "Projects Built", value: "10+", icon: Code2 },
            { label: "Future Goals", value: "∞", icon: Rocket },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className={`rounded-xl border border-border bg-card/50 p-3 md:p-4 text-center transition-all duration-700 hover:border-primary/50 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${(milestones.length + i) * 100}ms` }}
              >
                <Icon className="mx-auto mb-1 md:mb-2 h-4 w-4 md:h-5 md:w-5 text-primary" />
                <div className="font-mono text-base md:text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Komponen Timeline Node
function TimelineNode({ color, isActive }: { color: string; isActive: boolean }) {
  return (
    <>
      <div 
        className={`absolute h-4 w-4 rounded-full transition-all duration-500 ${
          isActive ? 'scale-150' : 'scale-100'
        }`}
        style={{
          backgroundColor: color,
          boxShadow: isActive ? `0 0 20px ${color}` : 'none',
        }}
      />
      <div 
        className="absolute h-8 w-8 animate-ping rounded-full opacity-30"
        style={{ backgroundColor: color }}
      />
    </>
  )
}

// Komponen Timeline Card (untuk mobile dan desktop)
function TimelineCard({ 
  milestone, 
  Icon, 
  isActive,
  t,
  isMobile,
  alignRight = false
}: { 
  milestone: any
  Icon: any
  isActive: boolean
  t: any
  isMobile: boolean
  alignRight?: boolean
}) {
  if (isMobile) {
    // Mobile card - compact version
    return (
      <div 
        className={`cyber-card group relative overflow-hidden rounded-2xl border-2 bg-card p-4 transition-all duration-500 ${
          isActive ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'
        }`}
      >
        <div 
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
            isActive ? 'opacity-100' : ''
          }`}
          style={{
            background: `radial-gradient(circle at center, ${milestone.color}20, transparent 70%)`,
          }}
        />
        
        {/* Year badge */}
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-1">
            <CalendarDays className="h-3 w-3" style={{ color: milestone.color }} />
            <span className="font-mono text-[10px] font-bold" style={{ color: milestone.color }}>
              {milestone.year}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/60">•</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {milestone.period}
          </span>
        </div>

        {/* Title and icon */}
        <div className="mb-3 flex items-center gap-2">
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2"
            style={{
              borderColor: `${milestone.color}40`,
              background: `${milestone.color}10`,
            }}
          >
            <Icon className="h-4 w-4" style={{ color: milestone.color }} />
          </div>
          <h3 className="text-base font-bold text-foreground">
            {t(milestone.titleKey)}
          </h3>
        </div>

        {/* Description */}
        <p className="mb-3 text-xs text-muted-foreground leading-relaxed">
          {t(milestone.descKey)}
        </p>

        {/* Location */}
        <div className="mb-2 flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
          <MapPin className="h-2.5 w-2.5" style={{ color: milestone.color }} />
          <span>{milestone.location}</span>
        </div>

        {/* Achievements - show only when active on mobile */}
        {isActive && (
          <div className="space-y-1.5 border-t border-border pt-3 mt-2">
            {milestone.achievements.map((achievement: string, i: number) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px]">
                <Sparkles className="h-2.5 w-2.5 flex-shrink-0" style={{ color: milestone.color }} />
                <span className="text-muted-foreground">{achievement}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Desktop card - full version
  return (
    <div 
      className={`cyber-card group relative overflow-hidden rounded-2xl border-2 bg-card p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        isActive ? 'border-primary shadow-xl shadow-primary/20' : 'border-border'
      }`}
      style={{
        transform: isActive ? 'translateY(-8px)' : 'none',
      }}
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isActive ? 'opacity-100' : ''
        }`}
        style={{
          background: `radial-gradient(circle at center, ${milestone.color}20, transparent 70%)`,
        }}
      />
      
      {/* Year badge */}
      <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 ${alignRight ? 'flex-row' : 'flex-row-reverse'}`}>
        <CalendarDays className="h-3.5 w-3.5" style={{ color: milestone.color }} />
        <span className="font-mono text-xs font-bold" style={{ color: milestone.color }}>
          {milestone.year}
        </span>
        <span className="text-xs text-muted-foreground/60">•</span>
        <span className="font-mono text-xs text-muted-foreground">
          {milestone.period}
        </span>
      </div>

      {/* Title and icon */}
      <div className={`mb-4 flex items-center gap-3 ${alignRight ? 'flex-row' : 'flex-row-reverse'}`}>
        <div 
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all duration-500 group-hover:scale-110"
          style={{
            borderColor: `${milestone.color}40`,
            background: `${milestone.color}10`,
            boxShadow: isActive ? `0 0 20px ${milestone.color}40` : 'none',
          }}
        >
          <Icon className="h-5 w-5" style={{ color: milestone.color }} />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          {t(milestone.titleKey)}
        </h3>
      </div>

      {/* Description */}
      <p className="mb-4 text-muted-foreground leading-relaxed">
        {t(milestone.descKey)}
      </p>

      {/* Location */}
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground/70">
        <MapPin className="h-3 w-3" style={{ color: milestone.color }} />
        <span>{milestone.location}</span>
      </div>

      {/* Achievements */}
      <div className="space-y-2 border-t border-border pt-4">
        {milestone.achievements.map((achievement: string, i: number) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs"
            style={{
              animation: isActive ? `fadeIn 0.3s ease-out ${i * 100}ms both` : 'none',
            }}
          >
            <Sparkles className="h-3 w-3 flex-shrink-0" style={{ color: milestone.color }} />
            <span className="text-muted-foreground">{achievement}</span>
          </div>
        ))}
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 h-8 w-8">
        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2" style={{ borderColor: milestone.color }} />
      </div>
      <div className="absolute bottom-0 left-0 h-8 w-8">
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2" style={{ borderColor: milestone.color }} />
      </div>
    </div>
  )
}