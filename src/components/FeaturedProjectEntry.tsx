import Image from 'next/image'
import TagsList from '@/components/TagsList'

export default function FeaturedProjectsEntry({
  imagePath,
  imageAlt,
  hrefPath,
  title,
  blurb,
  tags,
  width = 125,
  height = 125,
}: ProjectEntry) {
  return (
    <div className="mt-7 flex items-center">
      <Image
        className="rounded-lg border-2 border-gray-700"
        src={imagePath}
        width={width}
        height={height}
        alt={imageAlt}
      />
      <div className="ml-4">
        <a className="text-xl" href={hrefPath} target="_blank">
          {title}
        </a>
        <div className="mt-1">{blurb}</div>
        {tags && <TagsList tags={tags} />}
      </div>
    </div>
  )
}
