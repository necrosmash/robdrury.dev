import { getProjects } from '@/utils/projects'
import ProjectsEntry from '@/components/ProjectsEntry'

export default function ProjectList() {
  return (
    <div>
      <div className="mb-7 text-center text-2xl font-semibold md:text-3xl">
        All projects
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
        {getProjects().map((p) => (
          <ProjectsEntry project={p} key={p.slug} variant="all" />
        ))}
      </div>
    </div>
  )
}
