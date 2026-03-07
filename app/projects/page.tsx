"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeading } from "@/components/section-heading"
import {
  Search,
  ExternalLink,
  Github,
  Play,
  X,
} from "lucide-react"
import { ProjectComments } from "@/components/project-comments"
import { useLanguage } from "@/components/language-provider"

const projects = [
  {
    id: 1,
    title: "Todos - Web todo",
    category: "Web Apps",
    description:
      "A simple and intuitive to-do list web app to boost productivity. Add tasks, mark as complete, delete, and filter by status. Built with vanilla JavaScript and local storage.",
    tags: ["JavaScript", "HTML", "CSS"],
    status: "In Progress",
    year: "2025",
    imageFile: "todos.png",
  },
  {
    id: 2,
    title: "Cuanku - Financial Tracker",
    category: "Web Apps",
    description:
      "A personal finance tracker to help you manage your money. Track income, expenses, and savings goals. Visualize your spending with charts and categories.",
    tags: ["React", "Hono.js", "PostgreSQL"],
    status: "In Progress",
    year: "2025",
    imageFile: "cuanku.png",
  },
  {
    id: 3,
    title: "Everlore Store - E-Commerce",
    category: "Web Apps",
    description:
      "A modern e-commerce clothing store with product catalog, cart functionality, and smooth UI. Features include product filtering, cart management, and responsive design.",
    tags: ["Next.js", "Tailwind", "Supabase"],
    status: "In Progress",
    year: "2025",
    imageFile: "everlore.png",
  },
]

// Mapping kategori ID ke key terjemahan
const categoryTranslationKeys: Record<string, string> = {
  "All": "projects.all",
  "Web Apps": "projects.webapps",
  "Design": "projects.design",
  "School Projects": "projects.school",
}

// Mapping terjemahan ke ID kategori (untuk filter)
const getCategoryIdFromTranslation = (translatedCat: string, t: (key: string) => string): string => {
  if (translatedCat === t("projects.all")) return "All"
  if (translatedCat === t("projects.webapps")) return "Web Apps"
  if (translatedCat === t("projects.design")) return "Design"
  if (translatedCat === t("projects.school")) return "School Projects"
  return "All"
}

export default function ProjectsPage() {
  const { t, dir } = useLanguage()
  const [search, setSearch] = useState("")
  const [activeCategoryTranslated, setActiveCategoryTranslated] = useState(t("projects.all"))
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null)

  // Dapatkan ID kategori asli dari teks terjemahan yang aktif
  const activeCategoryId = useMemo(() => 
    getCategoryIdFromTranslation(activeCategoryTranslated, t),
    [activeCategoryTranslated, t]
  )

  // Categories dengan terjemahan untuk ditampilkan
  const categories = [
    t("projects.all"),
    t("projects.webapps"),
    t("projects.design"),
    t("projects.school"),
  ]

  // Filter proyek berdasarkan ID kategori asli
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase())
      
      const matchesCategory =
        activeCategoryId === "All" || p.category === activeCategoryId
      
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategoryId])

  // Fungsi untuk mendapatkan teks status yang diterjemahkan
  const getStatusText = (status: string) => {
    return status === "Completed" ? t("projects.completed") : t("projects.inprogress")
  }

  // Fungsi untuk mendapatkan teks kategori yang diterjemahkan
  const getCategoryText = (category: string) => {
    const key = categoryTranslationKeys[category]
    return key ? t(key) : category
  }

  return (
    <div className="page-enter min-h-screen" dir={dir}>
      <Navbar />
      <main className="pt-24">
        {/* Header */}
        <section className="relative py-16 md:py-24">
          <div className="cyber-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionHeading
              tag={t("projects.tag")}
              title={t("projects.title")}
              description={t("projects.desc")}
            />

            {/* Search */}
            <div className="mx-auto mb-8 max-w-md">
              <div className="relative">
                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("projects.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card py-3 pr-4 pl-11 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Category filters */}
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryTranslated(cat)}
                  className={`rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                    activeCategoryTranslated === cat
                      ? "neon-border border border-primary bg-primary/10 text-primary"
                      : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="cyber-card group rounded-xl border border-border bg-card text-left transition-all hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Preview dengan gambar */}
                  <div className="relative h-40 overflow-hidden rounded-t-xl bg-secondary">
                    {/* Gambar proyek */}
                    <Image
                      src={`/images/${project.imageFile}`}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    
                    {/* Cyber grid effect */}
                    <div className="cyber-grid absolute inset-0 opacity-30 mix-blend-overlay" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="rounded-md border border-primary/20 bg-background/80 px-2 py-1 font-mono text-[10px] text-primary backdrop-blur-sm">
                        {getCategoryText(project.category)}
                      </span>
                    </div>
                    
                    {/* Status badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className={`rounded-md px-2 py-1 font-mono text-[10px] backdrop-blur-sm ${
                          project.status === "Completed"
                            ? "border border-green-500/20 bg-green-500/10 text-green-500"
                            : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {getStatusText(project.status)}
                      </span>
                    </div>

                    {/* Project ID number (elemen dekoratif) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <span className="font-mono text-6xl font-bold text-white">
                        {String(project.id).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-mono text-base font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description}
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
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-mono text-muted-foreground">
                  {t("projects.empty")}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="neon-border relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            dir={dir}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:text-primary"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Gambar di modal */}
            <div className="relative h-56 md:h-72">
              <Image
                src={`/images/${selectedProject.imageFile}`}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="cyber-grid absolute inset-0 opacity-30 mix-blend-overlay" />
              
              {/* Video placeholder overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative flex flex-col items-center gap-3 text-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-mono text-xs text-white/80">
                    {t("projects.video")}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[10px] text-primary">
                  {getCategoryText(selectedProject.category)}
                </span>
                <span
                  className={`rounded-md px-2 py-1 font-mono text-[10px] ${
                    selectedProject.status === "Completed"
                      ? "border border-green-500/20 bg-green-500/10 text-green-500"
                      : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {getStatusText(selectedProject.status)}
                </span>
              </div>
              
              <h2 className="mb-3 text-2xl font-bold text-foreground">
                {selectedProject.title}
              </h2>
              
              <p className="mb-6 text-muted-foreground leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 font-mono text-sm text-foreground transition-all hover:border-primary/50 hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  {t("projects.source")}
                </a>
                <a
                  href="#"
                  className="neon-border inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-mono text-sm text-primary-foreground transition-all hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("projects.demo")}
                </a>
              </div>

              {/* Per-project comments */}
              <ProjectComments projectId={selectedProject.id} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}