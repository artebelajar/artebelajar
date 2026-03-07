"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Sparkles, Download } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const [offsetY, setOffsetY] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopIndex, setLoopIndex] = useState(0)
  const { t } = useLanguage()

  const phrases = [
    t("hero.phrase1"),
    t("hero.phrase2"),
    t("hero.phrase3"),
    t("hero.phrase4"),
  ]

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Reset typing on language change
  useEffect(() => {
    setTypedText("")
    setIsDeleting(false)
    setLoopIndex(0)
  }, [t])

  // Continuous typing + deleting loop
  useEffect(() => {
    const currentPhrase = phrases[loopIndex % phrases.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && typedText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false)
      setLoopIndex((prev) => prev + 1)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1))
      }, 40)
    } else {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1))
      }, 80)
    }

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, loopIndex, phrases])

  const handleDownloadCV = () => {
    const cvUrl = '/cv/AhmadAfanShobari-CV.png'
    
    const link = document.createElement('a')
    link.href = cvUrl
    link.download = `Ahmad_Afan_Shobari_CV_${new Date().getFullYear()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      ref={containerRef}
      className="scanlines relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="cyber-grid absolute inset-0 opacity-40" />

        <div
          className="absolute h-72 w-72 rounded-full opacity-20 blur-[100px]"
          style={{
            background: "var(--neon)",
            animation: "orbit-1 20s linear infinite",
          }}
        />
        <div
          className="absolute h-96 w-96 rounded-full opacity-10 blur-[120px]"
          style={{
            background: "var(--primary)",
            animation: "orbit-2 25s linear infinite reverse",
          }}
        />
        <div
          className="absolute h-64 w-64 rounded-full opacity-15 blur-[80px]"
          style={{
            background: "var(--neon)",
            animation: "orbit-3 18s linear infinite",
          }}
        />

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
              animation: `particle-float ${3 + i * 0.7}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.4 + i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div
        className="absolute top-[15%] right-[10%] h-40 w-40 border border-primary/10 md:h-64 md:w-64"
        style={{
          animation: "spin-reverse 30s ease-in-out infinite alternate",
          transform: `translateY(${offsetY * 0.1}px)`,
        }}
      />
      <div
        className="absolute bottom-[20%] left-[5%] h-32 w-32 border border-primary/5 md:h-48 md:w-48"
        style={{
          animation: "spin-reverse 25s ease-in-out infinite alternate-reverse",
          transform: `translateY(${offsetY * -0.08}px)`,
        }}
      />
      <div
        className="absolute top-[60%] right-[20%] hidden h-24 w-24 rounded-full border border-primary/5 md:block"
        style={{
          animation: "pulse-scale 6s ease-in-out infinite alternate",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          {/* Profile photo with animated ring */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute -inset-3 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--neon), transparent 30%, transparent 70%, var(--primary))",
                animation: "spin-slow 8s linear infinite",
              }}
            />
            <div
              className="absolute -inset-5 rounded-full opacity-40"
              style={{
                background:
                  "conic-gradient(from 180deg, var(--primary), transparent 25%, transparent 75%, var(--neon))",
                animation: "spin-slow 12s linear infinite reverse",
              }}
            />
            <div className="absolute -inset-3 rounded-full bg-background" style={{ margin: "2px" }} />
            <div
              className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-primary/20 md:h-52 md:w-52"
              style={{
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <Image
                src="/images/city.png"
                alt="Ahmad Afan Shobari"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute right-1 bottom-1 md:right-2 md:bottom-2">
              <span className="relative flex h-4 w-4">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                  style={{ animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
                />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
              </span>
            </div>
          </div>

          {/* Text content */}
          <div className="text-center md:text-left">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm"
              style={{ animation: "fade-slide-up 0.8s ease-out" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs tracking-wider text-primary">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="neon-text text-primary">{typedText}</span>
              <span
                className="inline-block w-0.5 align-baseline text-primary"
                style={{ animation: "blink-caret 0.75s step-end infinite" }}
              >
                |
              </span>
            </h1>

            <div
              className="mb-2 font-mono text-lg text-foreground/80 md:text-xl"
              style={{ animation: "fade-slide-up 0.8s ease-out 0.2s both" }}
            >
              {t("hero.name")}
            </div>

            <p
              className="mx-auto mb-10 max-w-lg text-pretty text-sm text-muted-foreground leading-relaxed md:mx-0 md:text-base"
              style={{ animation: "fade-slide-up 0.8s ease-out 0.4s both" }}
            >
              {t("hero.subtitle")}
            </p>

            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start"
              style={{ animation: "fade-slide-up 0.8s ease-out 0.6s both" }}
            >
              <a
                href="/projects"
                className="neon-border group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:shadow-lg"
              >
                <span>{t("hero.cta1")}</span>
                <span className="transition-transform group-hover:translate-x-1">
                  {"\u2192"}
                </span>
              </a>
              
              {/* Tombol Download CV */}
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-secondary/80 px-6 py-3 font-mono text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:shadow-lg backdrop-blur-sm group"
              >
                <Download className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                <span>Download CV</span>
                <span className="text-xs text-muted-foreground/50 ml-1">(PDF)</span>
              </button>
            </div>
            
            {/* Info kecil di bawah tombol */}
            <p className="mt-4 text-xs text-muted-foreground/40 font-mono">
              Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <span className="font-mono text-xs tracking-wider">{t("hero.scroll")}</span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  )
}