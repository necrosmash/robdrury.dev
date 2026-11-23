import { getGames } from '@/utils/games'
import { getSoftwareProjects } from '@/utils/software-projects'
import SoftwareProjectsEntry from '@/components/SoftwareProjectsEntry'
import GamesEntry from '@/components/GamesEntry'

export default function ProjectList() {
  return (
    <div>
      <ProjectListSectionTitle>Software projects</ProjectListSectionTitle>
      <div className="mx-auto mb-20 w-fit">
        {getSoftwareProjects().map((sp) => (
          <SoftwareProjectsEntry project={sp} key={sp.title} />
        ))}
      </div>
      <ProjectListSectionTitle>Games</ProjectListSectionTitle>
      <ProjectListContainer>
        {getGames().map((p) => (
          <GamesEntry game={p} key={p.slug} variant="all" />
        ))}
      </ProjectListContainer>
    </div>
  )
}

const ProjectListSectionTitle = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className="mb-7 text-center text-2xl font-semibold md:text-3xl">
    {children}
  </div>
)

const ProjectListContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-16 flex flex-wrap justify-center gap-x-4 gap-y-8">
    {children}
  </div>
)
