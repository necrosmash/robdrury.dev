import { getSortedBlogPostsMetadata } from '@/utils/posts'
import { getGames } from '@/utils/games'
import { getSoftwareProjects } from '@/utils/software-projects'

export const dynamic = 'force-static'

export async function GET() {
  const rssFeedItems: RSSFeedItem[] = [
    ...getSortedBlogPostsMetadata().map((p) => blogPostToFeedItem(p)),
    ...getGames().map((p) => gameToFeedItem(p)),
    ...getSoftwareProjects().map((p) => softwareProjectToFeedItem(p)),
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

const gameToFeedItem = (game: Game): RSSFeedItem => ({
  guid: `project-${game.slug}`,
  title: `New game release: ${game.title}`,
  description: game.blurb,
  link: game.hrefPath,
  pubDate: game.uploaded,
  imagePath: game.imagePath,
  imageAlt: game.imageAlt,
})

const softwareProjectToFeedItem = (
  softwareProject: SoftwareProject
): RSSFeedItem => ({
  guid: `project-${softwareProject.title}`,
  title: `New project: ${softwareProject.title}`,
  description: softwareProject.description,
  link: softwareProject.hrefPath,
  pubDate: softwareProject.uploaded,
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
