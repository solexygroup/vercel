import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Powered by headless WordPress
          </span>

          <h1 className="mt-6 text-balance font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Ideas worth reading, published at the speed of the web.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Overstory is a publication on design, engineering, and the craft of
            building for the web — written in WordPress, delivered through a fast,
            modern front end.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#latest"
              className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-6')}
            >
              Read the latest
            </Link>
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'rounded-full px-6',
              )}
            >
              Join the newsletter
            </Link>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-8">
            <div>
              <dt className="text-sm text-muted-foreground">Published</dt>
              <dd className="mt-1 font-serif text-2xl">240+ stories</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Readers</dt>
              <dd className="mt-1 font-serif text-2xl">38k monthly</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Cadence</dt>
              <dd className="mt-1 font-serif text-2xl">Weekly</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
