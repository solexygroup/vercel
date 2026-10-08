import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Latest', href: '#latest' },
  { label: 'Design', href: '#latest' },
  { label: 'Engineering', href: '#latest' },
  { label: 'About', href: '#contact' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-serif text-lg leading-none">
            O
          </span>
          <span className="font-serif text-xl tracking-tight">Overstory</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className={cn(buttonVariants({ size: 'sm' }), 'rounded-full px-5')}
        >
          Subscribe
        </Link>
      </div>
    </header>
  )
}
