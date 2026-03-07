"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export function ProjectsShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  const featuredProjects = [
    {
      titleKey: "showcase.p1.title",
      descKey: "showcase.p1.desc",
      tags: ["JavaScript", "Tailwind", "Hono"],
      category: "Web App",
      imageFile: "everlore.png",
    },
    {
      titleKey: "showcase.p2.title",
      descKey: "showcase.p2.desc",
      tags: ["HTML", "CSS", "JavaScript"],
      category: "Design",
      imageFile: "todos.png",
    },
    {
      titleKey: "showcase.p3.title",
      descKey: "showcase.p3.desc",
      tags: ["Figma", "JavaScript", "PostgreSQL"],
      category: "Full Stack",
      imageFile: "cuanku.png",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-24 md:py-32">
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          tag={t("showcase.tag")}
          title={t("showcase.title")}
          description={t("showcase.desc")}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <div
              key={project.titleKey}
              className={`cyber-card group rounded-xl border border-border bg-card transition-all duration-700 ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
                }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative h-44 overflow-hidden rounded-t-xl bg-secondary">
                <Image
                  src={`/images/${project.imageFile}`}
                  alt={t(project.titleKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="cyber-grid absolute inset-0 opacity-30 mix-blend-overlay" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="rounded-md border border-primary/20 bg-background/80 px-2 py-1 font-mono text-[10px] text-primary backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:text-primary">
                    <Github className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:text-primary">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 font-mono text-base font-semibold text-foreground">
                  {t(project.titleKey)}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  {t(project.descKey)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 font-mono text-sm text-foreground transition-all hover:border-primary/50 hover:text-primary"
          >
            {t("showcase.viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
