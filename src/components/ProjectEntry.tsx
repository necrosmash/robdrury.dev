import Image from "next/image"

export default function ProjectEntry({imagePath, imageAlt, hrefPath, title, blurb, width = 630, height = 500}: ProjectEntry) {
  return (
    <div className="w-72">
      <a href={hrefPath} target="_blank">
        <Image className="rounded-lg border-2 border-gray-700" src={imagePath} width={width} height={height} alt={imageAlt} />
      </a>
      <div className="ml-0.5 mt-1">
        <a className="text-2xl" href={hrefPath} target="_blank">
          {title}
        </a>
        {blurb && (
          <div className="mt-1">
            {blurb}
          </div>
        )}
      </div>
    </div>
  )
}
