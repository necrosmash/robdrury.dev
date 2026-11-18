import fs from 'fs'
import matter from 'gray-matter'

export function getSortedBlogPostsMetadata(
  tag?: string,
  numOfEntries?: number
): BlogPostMetadata[] {
  let postsFrontmatter = fs
    .readdirSync('blogPosts')
    .map(
      (fileName) =>
        matter.read(`blogPosts/${fileName}`).data as BlogPostMetadata
    )

  if (tag) {
    postsFrontmatter = postsFrontmatter.filter((post) =>
      post.tags.split(',').includes(tag)
    )
  }

  postsFrontmatter.sort(
    (a, b) => new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime()
  )

  if (numOfEntries) return postsFrontmatter.slice(0, numOfEntries)
  else return postsFrontmatter
}

export function getBlogPostBySlug(slug: string): {
  data: BlogPostMetadata
  content: string
} {
  for (const fileName of fs.readdirSync('blogPosts')) {
    const post = matter.read(`blogPosts/${fileName}`)
    if (post.data.slug === slug) {
      return { data: post.data as BlogPostMetadata, content: post.content }
    }
  }
  throw new Error(`No blog post with slug "${slug}"`)
}
