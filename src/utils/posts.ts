import fs, { read } from 'fs'

export function getSortedPostsMetadata(): PostMetadata[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync("blogPosts")
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.json$/, '')  
    const { title, date, tags } = JSON.parse(readBlogPostFile(fileName))

    return {
      id,
      title,
      date,
      tags
    } as PostMetadata
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPost(id: string): Post {
  const { title, date, content, tags } = JSON.parse(readBlogPostFile(`${id}.json`))

  return {
    id,
    title,
    date,
    tags,
    content
  }
}

function readBlogPostFile(name: string): string {
  const fullPath = "blogPosts" + "/" + name
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return fileContents
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