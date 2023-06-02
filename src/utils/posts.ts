import fs from 'fs'
import matter from 'gray-matter'

export function getSortedPostsMetadata(tag: string | null = null): PostMetadata[] {
  let postsFrontmatter = fs.readdirSync('blogPosts').map((fileName) => (
    matter.read(`blogPosts/${fileName}`).data as PostMetadata
  ))

  if (tag) {
    postsFrontmatter = postsFrontmatter.filter(post => (
      post.tags.split(", ")).includes(tag)
    )
  }

  return postsFrontmatter.sort((a, b) => (
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ))
}