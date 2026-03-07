"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Sun, Moon, Terminal, Globe, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { type Locale, localeLabels } from "@/lib/translations"

const internalNavKeys = [
  { href: "/", key: "nav.home" },
  { href: "/projects", key: "nav.projects" },
  { href: "/about", key: "nav.about" },
]

const externalLinks = [
  { href: "https://blog.artera.my.id/", label: "Blog", icon: ExternalLink }
]

const locales: Locale[] = ["en", "id", "ar"]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { locale, setLocale, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number
    width: number
  } | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Animate active indicator pill (hanya untuk internal links)
  useEffect(() => {
    const activeLink = linkRefs.current.get(pathname)
    const nav = navRef.current
    if (activeLink && nav) {
      const navRect = nav.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      })
    } else {
      // Jika tidak ada link aktif (misalnya di halaman blog eksternal), sembunyikan indicator
      setIndicatorStyle(null)
    }
  }, [pathname, mounted, locale])

  return (
    <>
      {/* Desktop floating pill navbar */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-5 pointer-events-none">
        <div
          className={`pointer-events-auto hidden md:flex items-center gap-1 rounded-full border border-white/20 dark:border-white/10 px-1.5 py-1.5 transition-all duration-500 ${
            scrolled
              ? "bg-white/70 dark:bg-gray-900/70 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "bg-white/50 dark:bg-gray-900/50 shadow-md shadow-black/5 backdrop-blur-lg"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group mr-1 flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 transition-all group-hover:bg-primary/30">
              <Terminal className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-mono text-xs font-bold tracking-wider text-foreground/90 dark:text-foreground/90">
              {"afan.dev"}
            </span>
          </Link>

          <div className="mx-0.5 h-5 w-px bg-black/10 dark:bg-white/10" />

          {/* Nav links with sliding indicator (internal only) */}
          <div ref={navRef} className="relative flex items-center">
            {indicatorStyle && (
              <div
                className="absolute top-0 h-full rounded-full bg-black/10 dark:bg-white/10 transition-all duration-300 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            )}
            {internalNavKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href, el)
                }}
                className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}

            {/* External blog link */}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
                <link.icon className="h-3 w-3" />
              </a>
            ))}
          </div>

          <div className="mx-0.5 h-5 w-px bg-black/10 dark:bg-white/10" />

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-foreground/70 transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] font-semibold tracking-wider">
                {localeLabels[locale]}
              </span>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute top-full right-0 mt-2 w-36 overflow-hidden rounded-xl border border-white/20 bg-white/80 dark:bg-gray-900/80 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-200 dark:border-white/10 ${
                langOpen
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc)
                    setLangOpen(false)
                  }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors ${
                    locale === loc
                      ? "bg-black/10 dark:bg-white/10 text-foreground"
                      : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold tracking-wider text-primary">
                    {localeLabels[loc]}
                  </span>
                  <span className="text-xs">
                    {loc === "en" ? "English" : loc === "id" ? "Indonesia" : "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-4 pointer-events-none md:hidden">
        <div
          className={`pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-full border border-white/20 dark:border-white/10 px-2 py-1.5 transition-all duration-500 ${
            scrolled
              ? "bg-white/70 dark:bg-gray-900/70 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "bg-white/50 dark:bg-gray-900/50 shadow-md shadow-black/5 backdrop-blur-lg"
          }`}
        >
          <Link href="/" className="flex items-center gap-1.5 pl-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
              <Terminal className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-mono text-xs font-bold tracking-wider text-foreground/90">
              {"afan.dev"}
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {/* Mobile language button */}
            <button
              onClick={() => {
                const idx = locales.indexOf(locale)
                setLocale(locales[(idx + 1) % locales.length])
              }}
              className="flex h-8 items-center gap-1 rounded-full px-2 text-foreground/70 transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] font-semibold">
                {localeLabels[locale]}
              </span>
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`fixed top-16 right-0 left-0 z-40 flex justify-center px-4 md:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/80 dark:bg-gray-900/80 p-2 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10">
          {/* Internal links */}
          {internalNavKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-black/10 dark:bg-white/10 text-foreground"
                  : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          
          {/* External blog link untuk mobile */}
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
            >
              <span>{link.label}</span>
              <link.icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}