import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/posts'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`#${post.slug}`}
        className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted"
      >
        <Image
          src={post.cover || '/placeholder.svg'}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mt-5 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-widest text-primary">
            {post.category}
          </span>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="mt-3 text-balance font-serif text-2xl leading-snug tracking-tight">
          <Link href={`#${post.slug}`} className="transition-colors hover:text-primary">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{post.author}</span>
          <span aria-hidden="true">•</span>
          <time>{post.date}</time>
        </div>
      </div>
    </article>
  )
}
