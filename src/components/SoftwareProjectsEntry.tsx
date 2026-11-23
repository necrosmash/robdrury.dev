export default function SoftwareProjectsEntry({
  project,
}: {
  project: SoftwareProject
}) {
  return (
    <div className="mb-6" key={project.title}>
      <div className="flex text-center">
        <a href={project.hrefPath} target="_blank">
          <project.icon size={38} className="mt-2 mr-5" />
        </a>
        <div className="">
          <a href={project.hrefPath} target="_blank">
            <div className="mb-2 text-left text-2xl">{project.title}</div>
          </a>
          <div className="text-left">{project.description}</div>
        </div>
      </div>
    </div>
  )
}
