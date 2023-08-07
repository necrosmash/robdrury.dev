import fs from 'fs'

const generateFeedItem = (post: PostMetadata) => `
  <item>
    <title>${post.title}</title>
    <link>https://www.robdrury.dev/blog/post/${post.title}</link>
    <description>${post.title}</description>
    <pubDate>${new Date(post.uploaded).toUTCString()}</pubDate>
  </item>
`;

const generateFeed = (posts: PostMetadata[]) => `
  <rss version="2.0">
    <channel>
      <title>robdrury.dev</title>
      <link>https://www.robdrury.dev</link>
      <description>Rob Drury's personal website</description>
      <language>en</language>
      ${posts.map(generateFeedItem).join('')}
    </channel>
  </rss>
`;

export function writeRssFeed(posts: PostMetadata[]) {
  const rss = generateFeed(posts)
  fs.writeFileSync('./public/rss.xml', rss);
}