import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import { SEO } from '@/lib/seo'
import { ArrowRight, Code2, KeyRound } from 'lucide-react'
import Link from 'next/link'
import { type ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<div className='relative min-h-screen'>
			{/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="page-container flex h-16 items-center justify-between">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
						<a
              href="#quickstart"
              className="transition-colors hover:text-foreground"
            >
              Quick Start
            </a>
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="transition-colors hover:text-foreground"
            >
              Architecture
            </a>
            
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.AUTH.LOGIN()}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className:
                  "hidden sm:inline-flex border-border/80 hover:border-brand/40 hover:text-brand",
              })}
            >
              <KeyRound className="size-3.5 mr-1" />
              Sign in
            </Link>
            <a
              href="#quickstart"
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className:
                  "bg-brand text-white shadow-sm shadow-brand/30 hover:bg-brand/90",
              })}
            >
              Get Template
              <ArrowRight className="size-3.5 ml-1" />
            </a>
          </div>
        </div>
      </header>
			{children}
			<footer className="mt-20 border-t border-border/70 bg-card/40 py-8 text-center text-xs text-muted-foreground">
        <div className="page-container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-foreground">
              Next-app
            </span>
            <span>•</span>
            <span>Quick Start Next.js Template</span>
          </div>
          <p>
            Built with Next.js 16, React 19, Tailwind CSS & Biome
          </p>
        </div>
      </footer>
		</div>
	)
}
