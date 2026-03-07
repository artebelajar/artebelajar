"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/components/language-provider"
import { 
  SiJavascript, 
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiHono,
  SiTailwindcss,
  SiPostgresql,
  SiSupabase,
  SiPrisma,
  SiDocker,
  SiFigma,
  SiVercel,
  SiCloudflare,
  SiGit,
  SiGithub,
} from "react-icons/si"

// Data skills dengan ikon
const skills = [
  { name: "JavaScript", level: 20, color: "var(--neon)", icon: SiJavascript },
  { name: "TypeScript", level: 15, color: "var(--primary)", icon: SiTypescript },
  { name: "React", level: 18, color: "var(--chart-3)", icon: SiReact },
  { name: "Next.js", level: 12, color: "var(--chart-2)", icon: SiNextdotjs },
  { name: "Node.js", level: 10, color: "var(--chart-4)", icon: SiNodedotjs },
  { name: "Hono.js", level: 30, color: "var(--neon)", icon: SiHono },
  { name: "Tailwind CSS", level: 40, color: "var(--primary)", icon: SiTailwindcss },
  { name: "PostgreSQL", level: 25, color: "var(--chart-3)", icon: SiPostgresql },
  { name: "Supabase", level: 20, color: "var(--chart-2)", icon: SiSupabase },
  { name: "Prisma", level: 15, color: "var(--chart-4)", icon: SiPrisma },
  { name: "Docker", level: 5, color: "var(--neon)", icon: SiDocker },
  { name: "Figma", level: 50, color: "var(--primary)", icon: SiFigma },
]

// Tools dan platform
const tools = [
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
  { name: "VSCode", icon: SiVercel, color: "#007ACC" }, // Pakai Vercel sebagai placeholder
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
]

function CircularProgress({
  level,
  color,
  name,
  isVisible,
  icon: Icon,
}: {
  level: number
  color: string
  name: string
  isVisible: boolean
  icon: React.ElementType
}) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (level / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative h-24 w-24 md:h-28 md:w-28">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            style={{
              transition: "stroke-dashoffset 1.5s ease-out",
              filter: `drop-shadow(0 0 4px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon 
            className="h-8 w-8 md:h-10 md:w-10 transition-all duration-300 group-hover:scale-110" 
            style={{ color }}
          />
        </div>
      </div>
      <span className="font-mono text-xs text-muted-foreground">{name}</span>
      <span className="font-mono text-xs font-bold" style={{ color }}>
        {isVisible ? level : 0}%
      </span>
    </div>
  )
}

function SkillBar({
  name,
  level,
  color,
  isVisible,
  delay,
  icon: Icon,
}: {
  name: string
  level: number
  color: string
  isVisible: boolean
  delay: number
  icon: React.ElementType
}) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color }} />
          <span className="font-mono text-sm text-foreground">{name}</span>
        </div>
        <span className="font-mono text-sm" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

// Komponen untuk grid ikon statis (tanpa animasi)
function StaticIconsGrid() {
  return (
    <div className="grid grid-cols-3 gap-6 py-8 sm:grid-cols-4 md:grid-cols-5">
      {tools.map((tool, i) => {
        const Icon = tool.icon
        return (
          <div
            key={tool.name}
            className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110"
          >
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <Icon 
                  className="h-8 w-8" 
                  style={{ color: tool.color }}
                />
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{tool.name}</span>
          </div>
        )
      })}
    </div>
  )
}

// Komponen untuk ikon dengan efek hover sederhana
function SimpleIconsRow() {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-8">
      {tools.map((tool) => {
        const Icon = tool.icon
        return (
          <div
            key={tool.name}
            className="flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <Icon className="h-8 w-8" style={{ color: tool.color }} />
            </div>
            <span className="font-mono text-xs text-muted-foreground">{tool.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )
    
    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)
    
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  const stats = [
    { label: t("skills.months"), value: "18+" },
    { label: t("skills.projects"), value: "5+" },
    { label: t("skills.lines"), value: "10k+" },
    { label: t("skills.coffee"), value: "\u221E" },
  ]

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background sederhana */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-secondary/20" />
      <div className="cyber-grid absolute inset-0 opacity-10" />
      
      {/* Decorative elements minimal */}
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      
      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          tag={t("skills.tag")}
          title={t("skills.title")}
          description={t("skills.desc")}
        />

        {/* Ikon teknologi statis dengan hover effect */}
        <div className="mb-12">
          <SimpleIconsRow />
        </div>

        {/* Skill circles untuk desktop */}
        <div className="mb-12 hidden flex-wrap justify-center gap-4 md:flex">
          {skills.map((skill) => (
            <CircularProgress
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={skill.color}
              icon={skill.icon}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Skill bars untuk mobile */}
        <div className="space-y-4 md:hidden">
          {skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={skill.color}
              icon={skill.icon}
              isVisible={isVisible}
              delay={i * 100}
            />
          ))}
        </div>

        {/* Stats cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`rounded-xl border border-border bg-card/50 p-4 text-center backdrop-blur-sm transition-all duration-700 hover:border-primary/30 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="mb-1 font-mono text-xl font-bold text-primary md:text-2xl">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack indicator sederhana */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Hono.js • Supabase • TypeScript
          </span>
        </div>
      </div>
    </section>
  )
}