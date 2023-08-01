import AllProjectsEntry from "@/components/AllProjectEntry"

export default function BlogList() {
  return (
    <div>
      <div className="mb-7 text-2xl md:text-3xl font-semibold text-center">
        All projects
      </div>
      <div className="flex gap-x-4 gap-y-8 flex-wrap justify-center">
        <AllProjectsEntry title="Mote" blurb="March Game Jam 2023 entry" imagePath="/mote banner.png" imageAlt="Mote banner" hrefPath="https://necrosmash.itch.io/mote" />
        <AllProjectsEntry title="Thesis prototype" blurb="Generating story with ChatGPT via player input and enemy traits" tags={['thesis']} imagePath="/thesis prototype banner.png" imageAlt="Thesis prototype banner" hrefPath="https://github.com/necrosmash/thesis_prototype" />
      </div>
    </div>
  )
}