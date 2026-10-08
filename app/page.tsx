import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { PostGrid } from '@/components/post-grid'
import { ContactFooter } from '@/components/contact-footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
test
        <PostGrid />
      </main>
      <ContactFooter />
    </div>
  )
}
