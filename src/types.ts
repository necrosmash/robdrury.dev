type BlogPostMetadata = {
  slug: string
  uploaded: string
  updated?: string
  title: string
  tags: string
}

type Game = {
  slug: string
  imagePath: string
  imageAlt: string
  uploaded: string
  title: string
  hrefPath: string
  blurb: string
  tags?: string[]
}

type GamesEntryProps = {
  game: Game
  variant: 'all' | 'featured'
  width?: number
  height?: number
}

type SoftwareProject = {
  title: string
  hrefPath: string
  description: string
  icon: import('react-icons').IconType
  uploaded: string
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
