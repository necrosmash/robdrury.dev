import { getSortedBlogPostsMetadata } from '@/utils/posts'
import { getProjects } from '@/utils/projects'

export const dynamic = 'force-static'

export async function GET() {
  const rssFeedItems: RSSFeedItem[] = [
    ...getSortedBlogPostsMetadata().map((p) => blogPostToFeedItem(p)),
    ...getProjects().map((p) => projectToFeedItem(p)),
  ]
  const rss = generateFeed(
    rssFeedItems.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )
  )
  var r = new Response(rss)
  r.headers.set('Content-Type', 'application/rss+xml')
  return r
}

const blogPostToFeedItem = (post: BlogPostMetadata): RSSFeedItem => ({
  guid: `post-${post.slug}`,
  title: post.title,
  link: `https://www.robdrury.dev/blog/post/${post.slug}`,
  pubDate: post.uploaded,
})

const projectToFeedItem = (project: Project): RSSFeedItem => ({
  guid: `project-${project.slug}`,
  title: `New game release: ${project.title}`,
  description: project.blurb,
  link: project.hrefPath,
  pubDate: project.uploaded,
  imagePath: project.imagePath,
  imageAlt: project.imageAlt,
})

const generateFeed = (feedItems: RSSFeedItem[]) =>
  `<rss version="2.0">
  <channel>
  <title>robdrury.dev</title>
  <link>https://www.robdrury.dev</link>
  <description>Rob Drury's personal website</description>
  <language>en</language>
  ${feedItems.map(generateFeedItem).join('\n')}
  </channel>
  </rss>`

const generateFeedItem = (feedItem: RSSFeedItem) => {
  const description = generateFeedItemDescription(feedItem)
  return `    <item>
      <guid isPermaLink="false">${escapeXml(feedItem.guid)}</guid>
      <title>${escapeXml(feedItem.title)}</title>
      <link>${escapeXml(feedItem.link)}</link>${
        description
          ? `
      <description><![CDATA[${description}]]></description>`
          : ''
      }
      <pubDate>${new Date(feedItem.pubDate).toUTCString()}</pubDate>
    </item>`
}

const generateFeedItemDescription = (feedItem: RSSFeedItem) => {
  const image = feedItem.imagePath
    ? `<img src="${escapeXml(`https://www.robdrury.dev${encodeURI(feedItem.imagePath)}`)}" alt="${escapeXml(feedItem.imageAlt ?? '')}" />`
    : ''
  const text = feedItem.description
    ? `<p>${escapeXml(feedItem.description)}</p>`
    : ''
  return image + text
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
