type PostMetadata = {
  id: string,
  uploaded: string,
  updated?: string,
  title: string,
  tags: string
}

type ProjectEntry = {
  imagePath: string,
  imageAlt: string,
  title: string,
  hrefPath: string,
  blurb?: string,
  width?: number,
  height?: number,
}