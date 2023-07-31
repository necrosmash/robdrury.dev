import fs from 'fs'
import matter from 'gray-matter'

export function getSortedPostsMetadata(tag?: string, numOfEntries?: number): PostMetadata[] {
  let postsFrontmatter = fs.readdirSync('blogPosts').map((fileName) => (
    matter.read(`blogPosts/${fileName}`).data as PostMetadata
  ))

  if (tag) {
    postsFrontmatter = postsFrontmatter.filter(post => (
      post.tags.split(",")).includes(tag)
    )
  }

  postsFrontmatter.sort((a, b) => (
    new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime()
  ))

  if (numOfEntries)
    return postsFrontmatter.slice(0, numOfEntries)
  else
    return postsFrontmatter
}