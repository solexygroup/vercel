import { getPosts } from '@/lib/posts'
import { PostCard } from '@/components/post-card'

export async function PostGrid() {
  const posts = await getPosts()

  return (
    <section id="latest" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">Latest stories</h2>
          <p className="mt-2 text-muted-foreground">
            Fresh from the editors, updated every week.
          </p>
        </div>
        <span className="hidden shrink-0 text-sm text-muted-foreground md:block">
          {posts.length} articles
        </span>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
