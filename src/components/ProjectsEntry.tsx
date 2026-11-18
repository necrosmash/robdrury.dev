import Image from 'next/image'
import TagsList from '@/components/TagsList'

export default function ProjectsEntry({
  project,
  variant,
  width = variant === 'all' ? 630 : 125,
  height = variant === 'all' ? 500 : 100,
}: ProjectsEntryProps) {
  return (
    <div className={variant === 'all' ? 'w-72' : 'mt-7 flex items-center'}>
      <a href={project.hrefPath} className="shrink-0" target="_blank">
        <Image
          className="rounded-lg border-2 border-gray-700"
          src={project.imagePath}
          width={width}
          height={height}
          alt={project.imageAlt}
        />
      </a>
      <div className={variant === 'all' ? 'mt-1 ml-0.5' : 'ml-4'}>
        <a
          className={variant === 'all' ? 'text-2xl' : 'text-xl'}
          href={project.hrefPath}
          target="_blank"
        >
          {project.title}
        </a>
        <div className="mt-1">{project.blurb}</div>
        {project.tags && <TagsList tags={project.tags} />}
      </div>
    </div>
  )
}
