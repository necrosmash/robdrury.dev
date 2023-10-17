import Image from 'next/image'
import TagsList from '@/components/TagsList'

export default function ProjectsEntry({
  imagePath,
  imageAlt,
  hrefPath,
  title,
  blurb,
  tags,
  variant,
  width = variant === 'all' ? 630 : 125,
  height = variant === 'all' ? 500 : 100,
}: ProjectEntry) {
  return (
    <div className={variant === 'all' ? 'w-72' : 'mt-7 flex items-center'}>
      <a href={hrefPath} className="flex-shrink-0" target="_blank">
        <Image
          className="rounded-lg border-2 border-gray-700"
          src={imagePath}
          width={width}
          height={height}
          alt={imageAlt}
        />
      </a>
      <div className={variant === 'all' ? 'ml-0.5 mt-1' : 'ml-4'}>
        <a
          className={variant === 'all' ? 'text-2xl' : 'text-xl'}
          href={hrefPath}
          target="_blank"
        >
          {title}
        </a>
        <div className="mt-1">{blurb}</div>
        {tags && <TagsList tags={tags} />}
      </div>
    </div>
  )
}
