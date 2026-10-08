export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  cover: string
  author: string
  date: string
  readingTime: string
}

export const fallbackPosts: Post[] = [
  {
    slug: 'headless-wordpress-2026',
    title: 'Why headless WordPress is the quiet default in 2026',
    excerpt:
      'Decoupling the editor from the front end lets teams keep the CMS they love while shipping a modern, fast experience.',
    category: 'Engineering',
    cover: '/blog/cover-1.png',
    author: 'Mara Ellison',
    date: 'Mar 4, 2026',
    readingTime: '6 min read',
  },
  {
    slug: 'design-systems-that-last',
    title: 'Design systems that survive their second redesign',
    excerpt:
      'The tokens, naming, and governance choices that keep a system useful long after the launch enthusiasm fades.',
    category: 'Design',
    cover: '/blog/cover-2.png',
    author: 'Jonah Pierce',
    date: 'Feb 22, 2026',
    readingTime: '9 min read',
  },
  {
    slug: 'writing-for-the-web',
    title: 'Writing for the web when everyone is skimming',
    excerpt:
      'Structure, rhythm, and restraint — small editorial habits that make long-form pieces actually get read.',
    category: 'Writing',
    cover: '/blog/cover-3.png',
    author: 'Priya Nair',
    date: 'Feb 10, 2026',
    readingTime: '4 min read',
  },
  {
    slug: 'the-cost-of-abstraction',
    title: 'The real cost of one more layer of abstraction',
    excerpt:
      'Every helper you add is a promise to future maintainers. Here is how to tell the useful ones from the clever ones.',
    category: 'Engineering',
    cover: '/blog/cover-4.png',
    author: 'Diego Alvarez',
    date: 'Jan 28, 2026',
    readingTime: '7 min read',
  },
  {
    slug: 'slow-software',
    title: 'A case for slow software in a fast industry',
    excerpt:
      'What we lose when we optimize only for speed of shipping, and how to make room for craft again.',
    category: 'Culture',
    cover: '/blog/cover-5.png',
    author: 'Lena Whitfield',
    date: 'Jan 15, 2026',
    readingTime: '5 min read',
  },
  {
    slug: 'content-modeling-basics',
    title: 'Content modeling is the work most teams skip',
    excerpt:
      'Before the components and the CSS, decide what a story actually is. Your future editors will thank you.',
    category: 'Design',
    cover: '/blog/cover-6.png',
    author: 'Samuel Okafor',
    date: 'Jan 3, 2026',
    readingTime: '8 min read',
  },
]

const FALLBACK_COVERS = [
  '/blog/cover-1.png',
  '/blog/cover-2.png',
  '/blog/cover-3.png',
  '/blog/cover-4.png',
  '/blog/cover-5.png',
  '/blog/cover-6.png',
]

/** Strip HTML tags and decode the handful of entities WordPress returns in title/excerpt fields. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#8217;|&#039;|&#39;/g, "'")
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#8211;|&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/\s+/g, ' ')
    .trim()
}

function estimateReadingTime(html: string): string {
  const words = stripHtml(html).split(' ').filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

type WpPost = {
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content?: { rendered: string }
  _embedded?: {
    author?: { name?: string }[]
    'wp:featuredmedia'?: { source_url?: string; alt_text?: string }[]
    'wp:term'?: { name?: string; taxonomy?: string }[][]
  }
}

function mapWpPost(wp: WpPost, index: number): Post {
  const media = wp._embedded?.['wp:featuredmedia']?.[0]
  const terms = wp._embedded?.['wp:term'] ?? []
  const category = terms.flat().find((t) => t?.taxonomy === 'category')?.name

  return {
    slug: wp.slug,
    title: stripHtml(wp.title?.rendered ?? 'Untitled'),
    excerpt: stripHtml(wp.excerpt?.rendered ?? ''),
    category: category ?? 'Blog',
    cover: media?.source_url || FALLBACK_COVERS[index % FALLBACK_COVERS.length],
    author: wp._embedded?.author?.[0]?.name ?? 'Staff',
    date: new Date(wp.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    readingTime: estimateReadingTime(wp.content?.rendered ?? wp.excerpt?.rendered ?? ''),
  }
}

/**
 * Fetches posts from a headless WordPress site's REST API.
 * Set WORDPRESS_API_URL to your site's base URL (e.g. https://blog.example.com).
 * Falls back to the local placeholder posts when the env var is unset or the request fails.
 */
export async function getPosts(): Promise<Post[]> {
  const raw = process.env.WORDPRESS_API_URL

  if (!raw) {
    return fallbackPosts
  }

  // Normalize to the site root so we can append the full REST path ourselves.
  // Adds a protocol if missing, drops a trailing slash, and strips any trailing
  // REST path the user may have included (e.g. `/wp-json`, `/wp-json/wp/v2`).
  const base = (/^https?:\/\//.test(raw) ? raw : `https://${raw}`)
    .replace(/\/+$/, '')
    .replace(/\/wp-json(\/wp\/v\d+)?$/, '')

  try {
    const url = `${base}/wp-json/wp/v2/posts?_embed&per_page=6`
    const res = await fetch(url, { next: { revalidate: 600 } })

    if (!res.ok) {
      console.log('[v0] WordPress API responded with', res.status)
      return fallbackPosts
    }

    const data = (await res.json()) as WpPost[]
    if (!Array.isArray(data) || data.length === 0) {
      return fallbackPosts
    }

    return data.map(mapWpPost)
  } catch (error) {
    console.log('[v0] Failed to fetch WordPress posts:', (error as Error).message)
    return fallbackPosts
  }
}
