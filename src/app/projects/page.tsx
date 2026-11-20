import { getGames } from '@/utils/games'
import { getSoftwareProjects } from '@/utils/software-projects'
import GamesEntry from '@/components/GamesEntry'
import Link from 'next/link'

export default function ProjectList() {
  return (
    <div>
      <ProjectListSectionTitle>Software projects</ProjectListSectionTitle>
      <ProjectListContainer>
        {getSoftwareProjects().map((sp) => (
          <div key={sp.title}>
            <div className="flex text-center">
              <Link href={sp.hrefPath}>
                <sp.icon size={38} className="mt-2 mr-5" />
              </Link>
              <div className="">
                <Link href={sp.hrefPath}>
                  <div className="mb-2 text-left text-2xl">{sp.title}</div>
                </Link>
                <div className="text-left">{sp.description}</div>
              </div>
            </div>
          </div>
        ))}
      </ProjectListContainer>
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
