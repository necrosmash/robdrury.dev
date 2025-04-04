import ProjectsEntry from '@/components/ProjectsEntry'

export default function BlogList() {
  return (
    <div>
      <div className="mb-7 text-center text-2xl font-semibold md:text-3xl">
        All projects
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
        <ProjectsEntry
          title="Deep Blue Demo"
          blurb="Demo - submarine exploration"
          imagePath="/dpd banner.png"
          imageAlt="Deep Blue Demo banner"
          hrefPath="https://necrosmash.itch.io/deep-blue-demo"
          variant="all"
        />
        <ProjectsEntry
          title="Tweets of Fury"
          blurb="March Game Jam 25 entry"
          imagePath="/tof banner.png"
          imageAlt="Tweets of Fury banner"
          hrefPath="https://necrosmash.itch.io/tweets-of-fury"
          variant="all"
        />
        <ProjectsEntry
          title="Santa's Watchful Eye"
          blurb="Xmas Game Jam 24 entry"
          imagePath="/swe banner.png"
          imageAlt="Santa's Watchful Eye banner"
          hrefPath="https://nightanimal333.itch.io/santas-watchful-eye"
          variant="all"
        />
        <ProjectsEntry
          title="Bardbarian"
          blurb="Spooky Game Jam 24 entry"
          imagePath="/bardbarian banner.png"
          imageAlt="Bardbarian banner"
          hrefPath="https://nightanimal333.itch.io/bardbarian"
          variant="all"
        />
        <ProjectsEntry
          title="Language Links"
          blurb="Match words in English, Spanish, French, and German"
          imagePath="/language links banner.png"
          imageAlt="Language Links banner"
          hrefPath="https://languagelinks.robdrury.dev"
          variant="all"
        />
        <ProjectsEntry
          title="Trouble at the Pole"
          blurb="Xmas Game Jam 23 entry"
          imagePath="/tatp banner.png"
          imageAlt="Trouble at the Pole banner"
          hrefPath="https://nightanimal333.itch.io/trouble-at-the-pole"
          variant="all"
        />
        <ProjectsEntry
          title="The Keeper"
          blurb="Spooky Game Jam 23 entry"
          imagePath="/the keeper banner.png"
          imageAlt="The Keeper banner"
          hrefPath="https://nightanimal333.itch.io/the-keeper"
          variant="all"
        />
        <ProjectsEntry
          title="Mote"
          blurb="March Game Jam 2023 entry"
          imagePath="/mote banner.png"
          imageAlt="Mote banner"
          hrefPath="https://necrosmash.itch.io/mote"
          variant="all"
        />
        <ProjectsEntry
          title="Thesis prototype"
          blurb="Generating game story with ChatGPT"
          tags={['thesis']}
          imagePath="/thesis prototype banner.png"
          imageAlt="Thesis prototype banner"
          hrefPath="https://github.com/necrosmash/thesis_prototype"
          variant="all"
        />
      </div>
    </div>
  )
}
