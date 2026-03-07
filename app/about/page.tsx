"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image" // Tambahkan ini
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeading } from "@/components/section-heading"
import {
  Code2,
  MapPin,
  BookOpen,
  Heart,
  ChevronLeft,
  ChevronRight,
  Award,
  Zap,
  Target,
  Coffee,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"

// Data certificates tidak perlu diterjemahkan karena proper (nama sertifikat)
const certificates = [
  { title: "Web Development Fundamentals", issuer: "Online Course", year: "2024" },
  { title: "JavaScript Essentials", issuer: "Self-Study", year: "2024" },
  { title: "UI/UX Design Basics", issuer: "Figma Community", year: "2024" },
  { title: "Database Management", issuer: "Online Course", year: "2025" },
]

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
    >
      {children}
    </div>
  )
}

export default function AboutPage() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const { t, dir } = useLanguage()

  const scrollCarousel = (dir: "left" | "right") => {
    carouselRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    })
  }

  // Values dengan terjemahan
  const values = [
    {
      icon: Zap,
      title: t("about.val1.title"),
      description: t("about.val1.desc"),
    },
    {
      icon: Target,
      title: t("about.val2.title"),
      description: t("about.val2.desc"),
    },
    {
      icon: Heart,
      title: t("about.val3.title"),
      description: t("about.val3.desc"),
    },
    {
      icon: Coffee,
      title: t("about.val4.title"),
      description: t("about.val4.desc"),
    },
  ]

  return (
    <div className="page-enter min-h-screen" dir={dir}>
      <Navbar />
      <main className="pt-24">
        {/* Bio Section */}
        <section className="relative py-16 md:py-24">
          <div className="cyber-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionHeading
              tag={t("about.tag")}
              title={t("about.title")}
              description={t("about.desc")}
            />

            <AnimatedSection>
              <div className="grid items-start gap-12 md:grid-cols-5">
                {/* Profile card */}
                <div className="md:col-span-2">
                  <div className="neon-border sticky top-28 overflow-hidden rounded-2xl border border-border bg-card">
                    {/* Avatar area dengan foto profil */}
                    <div className="relative h-56 w-full overflow-hidden bg-secondary">
                      {/* Cyber grid overlay */}
                      <div className="cyber-grid absolute inset-0 opacity-30 z-10" />
                      
                      <Image
                        src="/images/tanpa-kain.jpg"
                        alt="Ahmad Afan Shobari"
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority // Prioritaskan loading karena di atas
                      />
                      
                      {/* Gradient overlay untuk efek */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
                      
                      {/* Decorative corners */}
                      <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-primary z-30" />
                      <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-primary z-30" />
                      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary z-30" />
                      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary z-30" />
                    </div>

                    <div className="p-6 text-center relative z-40">
                      <h3 className="mb-1 text-lg font-bold text-foreground">
                        Ahmad Afan Shobari
                      </h3>
                      <p className="mb-4 font-mono text-xs text-primary">
                        {t("about.role")}
                      </p>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          <span>{t("about.locationLabel")}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 text-primary" />
                          <span>PPQIT Al-Mahir</span>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
                        <div>
                          <div className="font-mono text-lg font-bold text-primary">
                            1.5
                          </div>
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {t("about.years")}
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-lg font-bold text-primary">
                            5+
                          </div>
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {t("about.projectsLabel")}
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-lg font-bold text-primary">
                            10k+
                          </div>
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {t("about.linesLabel")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <div className="space-y-6 md:col-span-3">
                  <div className="font-mono text-xs tracking-wider text-primary">
                    {t("about.bioTag")}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground">
                    {t("about.bioTitle")}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.bio1")}
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.bio2")}
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.bio3")}
                  </p>

                  <blockquote className="rounded-xl border-l-2 border-primary bg-primary/5 p-5">
                    <p className="text-sm text-foreground italic leading-relaxed">
                      {t("about.quote")}
                    </p>
                    <span className="mt-2 block font-mono text-xs text-muted-foreground">
                      {t("about.quoteAuthor")}
                    </span>
                  </blockquote>

                  {/* Values */}
                  <div className="grid gap-4 pt-4 sm:grid-cols-2">
                    {values.map((v) => {
                      const Icon = v.icon
                      return (
                        <div
                          key={v.title}
                          className="cyber-card rounded-xl border border-border bg-card p-5"
                        >
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="mb-1 font-mono text-sm font-semibold text-foreground">
                            {v.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {v.description}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Certificates */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="relative mx-auto max-w-6xl px-6">
            <AnimatedSection>
              <SectionHeading
                tag={t("about.certsTag")}
                title={t("about.certsTitle")}
                description={t("about.certsDesc")}
              />

              <div className="mb-4 flex justify-end gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all hover:border-primary/50 hover:text-primary"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all hover:border-primary/50 hover:text-primary"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={carouselRef}
                className="horizontal-scroll-section flex gap-5 overflow-x-auto pb-4"
                style={{ direction: dir === "rtl" ? "rtl" : "ltr" }}
              >
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="cyber-card min-w-[280px] flex-shrink-0 rounded-xl border border-border bg-card p-6"
                  >
                    <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-secondary">
                      <div className="cyber-grid absolute inset-0 opacity-20" />
                      <Award className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="mb-1 font-mono text-sm font-semibold text-foreground">
                      {cert.title}
                    </h4>
                    <p className="mb-2 text-xs text-muted-foreground">
                      {cert.issuer}
                    </p>
                    <span className="font-mono text-xs text-primary">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Current Status */}
        <section className="relative py-16 md:py-24">
          <div className="cyber-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-3xl px-6">
            <AnimatedSection>
              <div className="neon-border relative overflow-hidden rounded-2xl border-2 border-primary/40 bg-card p-8 md:p-12">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary" />

                <div className="text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    {t("about.statusActive")}
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                    {t("about.statusTitle")}
                  </h2>

                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    {t("about.statusDesc")}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 font-mono text-xs text-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {t("about.locationLabel")}
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 font-mono text-xs text-foreground">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      {t("about.aspirant")}
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 font-mono text-xs text-foreground">
                      <Heart className="h-3.5 w-3.5 text-primary" />
                      {t("about.collab")}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}