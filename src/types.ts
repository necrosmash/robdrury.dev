type BlogPostMetadata = {
  slug: string
  uploaded: string
  updated?: string
  title: string
  tags: string
}

type Project = {
  slug: string
  imagePath: string
  imageAlt: string
  uploaded: string
  title: string
  hrefPath: string
  blurb: string
  tags?: string[]
}

type ProjectsEntryProps = {
  project: Project
  variant: Variant
  width?: number
  height?: number
}

type RSSFeedItem = {
  guid: string
  title: string
  description?: string
  link: string
  pubDate: string
  imagePath?: string
  imageAlt?: string
}

type Variant = 'all' | 'featured'
