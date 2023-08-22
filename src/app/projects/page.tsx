import AllProjectsEntry from '@/components/AllProjectEntry'

export default function BlogList() {
  return (
    <div>
      <div className="mb-7 text-center text-2xl font-semibold md:text-3xl">
        All projects
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
        <AllProjectsEntry
          title="Mote"
          blurb="March Game Jam 2023 entry"
          imagePath="/mote banner.png"
          imageAlt="Mote banner"
          hrefPath="https://necrosmash.itch.io/mote"
        />
        <AllProjectsEntry
          title="Thesis prototype"
          blurb="Generating game story with ChatGPT"
          tags={['thesis']}
          imagePath="/thesis prototype banner.png"
          imageAlt="Thesis prototype banner"
          hrefPath="https://github.com/necrosmash/thesis_prototype"
        />
      </div>
    </div>
  )
}
