"use client"

import { useLanguage } from "@/components/language-provider"

interface SectionHeadingProps {
  tag: string
  title: string
  description?: string
}

export function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  const { dir } = useLanguage()
  
  return (
    <div className={`mb-12 flex flex-col items-center text-center`} dir={dir}>
      <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-xs tracking-widest text-primary uppercase">
        {tag}
      </span>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-lg text-pretty text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}