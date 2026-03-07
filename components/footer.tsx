import { 
  Github, 
  Instagram, 
  Linkedin, 
  Youtube,
  Home,
  Mail,
  MapPin,
  Heart,
  Terminal,
  ExternalLink,
  ChevronRight
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

// Define types for better TypeScript support
type InternalLink = {
  href: string
  labelKey: string
  external?: false
}

type ExternalLink = {
  href: string
  label: string
  external: true
}

type QuickLink = InternalLink | ExternalLink

const socialLinks = [
  { icon: Github, href: "https://github.com/artebelajar", label: "GitHub", username: "@afandev" },
  { icon: Instagram, href: "https://instagram.com/afan.dev", label: "Instagram", username: "@afan.dev" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ahmad-afan-shobari-a92165361/", label: "LinkedIn", username: "Ahmad Afan" },
  { icon: Youtube, href: "https://youtube.com/@afandev", label: "YouTube", username: "@afandev" },
]

const quickLinks: QuickLink[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/about", labelKey: "nav.about" },
  { href: "https://blog.artera.my.id/", label: "Blog", external: true },
]

// Type guard function
function isInternalLink(link: QuickLink): link is InternalLink {
  return !link.external && 'labelKey' in link
}

function isExternalLink(link: QuickLink): link is ExternalLink {
  return link.external === true && 'label' in link
}

export function Footer() {
  const { t, dir } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/50 bg-background" dir={dir}>
      {/* Cyber grid background */}
      <div className="cyber-grid absolute inset-0 opacity-20" />
      
      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Main footer content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <span className="font-mono text-lg font-bold tracking-wider text-primary">
                afan.dev
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            
            {/* Location with address */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">My Home on Java</p>
                  <p>Ngangkruk, Selokaton, Gondangrejo</p>
                  <p>Karanganyar, Jawa Tengah 16820</p>
                  <p>Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="mailto:afan@example.com" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  arte.ra272024@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span>Quick Links</span>
            </h3>
            
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {isExternalLink(link) ? (
                    // External link
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      <span>{link.label}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : isInternalLink(link) && (
                    // Internal link
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      <span>{t(link.labelKey)}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social links with usernames */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-primary" />
              <span>Connect</span>
            </h3>
            
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-2 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <link.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{link.label}</p>
                      <p className="text-[10px] text-muted-foreground">{link.username}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Mini quote / contact */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
              <Home className="h-3.5 w-3.5 text-primary" />
              <span>Work & Study</span>
            </h3>
            
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "Building the future, one line of code at a time. Currently learning full-stack development at PPQIT Al-Mahir."
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                </div>
                <span className="text-muted-foreground">Available for collaboration</span>
              </div>
            </div>
            
            {/* Made with love */}
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/60 md:justify-start">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
              <span>in Indonesia</span>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-mono text-xs text-muted-foreground/60">
              {t("footer.credit")}
            </p>
            
            <div className="flex items-center gap-4">
              <p className="font-mono text-xs text-muted-foreground/40">
                &copy; {currentYear} afan.dev
              </p>
              <span className="text-muted-foreground/20">|</span>
              <p className="font-mono text-xs text-muted-foreground/40">
                All rights reserved
              </p>
            </div>
            
            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-xs text-muted-foreground/40 hover:text-primary transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ChevronRight className="h-3 w-3 rotate-[-90deg] transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 h-12 w-12">
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-primary/30" />
      </div>
      <div className="absolute top-0 right-0 h-12 w-12">
        <div className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-primary/30" />
      </div>
    </footer>
  )
}