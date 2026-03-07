"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div
        ref={ref}
        className={`relative mx-auto max-w-6xl px-6 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <SectionHeading
          tag={t("intro.tag")}
          title={t("intro.title")}
          description={t("intro.desc")}
        />

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Profile photo */}
          <div className="flex justify-center">
            <div className="neon-border relative h-72 w-72 overflow-hidden rounded-2xl border-2 border-primary/30 md:h-80 md:w-80">
              <Image
                src="/images/rame.png"
                alt="Ahmad Afan Shobari"
                fill
                className="object-cover"
              />
              <div className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-primary/50" />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-5">
            <div className="font-mono text-xs tracking-wider text-primary">
              {t("intro.code")}
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {t("intro.hey")} <Heart className="inline h-5 w-5 text-primary" />
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("intro.bio1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("intro.bio2")}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["JavaScript", "Hono.js", "Tailwind", "Figma", "PostgreSQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
