import Link from 'next/link'
import { Button } from '@/components/ui/button'

const columns = [
  {
    heading: 'Sections',
    links: ['Design', 'Engineering', 'Writing', 'Culture'],
  },
  {
    heading: 'Publication',
    links: ['About', 'Contributors', 'Editorial policy', 'Archive'],
  },
  {
    heading: 'Elsewhere',
    links: ['Newsletter', 'RSS feed', 'Mastodon', 'GitHub'],
  },
]

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="max-w-md">
            <h2 className="text-balance font-serif text-3xl tracking-tight md:text-4xl">
              Get the best of Overstory in your inbox.
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              One thoughtful email a week. No spam, no noise — unsubscribe anytime.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-11 w-full rounded-full border border-input bg-background px-5 text-sm outline-none ring-ring/40 transition focus-visible:ring-2 sm:max-w-xs"
              />
              <Button type="submit" className="h-11 rounded-full px-6">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-sm font-semibold">{column.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-serif leading-none">
              O
            </span>
            <span className="font-serif text-lg tracking-tight">Overstory</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Overstory. Built with headless WordPress.
          </p>
        </div>
      </div>
    </footer>
  )
}
