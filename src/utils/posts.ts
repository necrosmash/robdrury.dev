import fs from 'fs'

export function getSortedPostsMetadata(tag: string | null = null): PostMetadata[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync("blogPosts")
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.json$/, '')  
    const { title, date, tags } = getBlogPost(fileName)

    return {
      id,
      title,
      date,
      tags
    }
  })

  let filteredPosts: PostMetadata[]
  if (tag)
    filteredPosts = allPostsData.filter(post => post.tags.includes(tag))
  else
    filteredPosts = allPostsData

  // Sort posts by date
  return filteredPosts.sort((a, b) => {
    if (a.date < b.date)
      return 1
    else
      return -1
  })
}

export function getPost(id: string): Post {
  const { title, date, tags, content } = getBlogPost(`${id}.json`)

  return {
    id,
    title,
    date,
    tags,
    content
  }
}

function getBlogPost(name: string): Post {
  const fullPath = "blogPosts" + "/" + name
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return JSON.parse(fileContents)
}

export interface PostMetadata {
  id: string
  title: string
  date: string
  tags: string[]
}

export interface Post extends PostMetadata {
  content: string
}