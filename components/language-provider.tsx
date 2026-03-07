"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { type Locale, translations } from "@/lib/translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null
    if (stored && translations[stored]) {
      setLocaleState(stored)
    }
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }, [])

  const t = useCallback(
    (key: string): string => {
      return translations[locale]?.[key] ?? translations.en[key] ?? key
    },
    [locale]
  )

  const dir = locale === "ar" ? "rtl" : "ltr"

  // Update html dir and lang attributes
  useEffect(() => {
    if (!mounted) return
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [dir, locale, mounted])

  if (!mounted) {
    // SSR/hydration: render with defaults
    return (
      <LanguageContext.Provider
        value={{
          locale: "en",
          setLocale,
          t: (key: string) => translations.en[key] ?? key,
          dir: "ltr",
        }}
      >
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
