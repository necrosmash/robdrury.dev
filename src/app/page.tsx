import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import BlogEntryList from '@/components/BlogEntryList'
import SocialLinks from '@/components/SocialLinks'
import ProjectsEntry from '@/components/ProjectsEntry'
import { getSortedPostsMetadata } from '@/utils/posts'

export default function Home() {
  return (
    <main>
      <div className="justify-between sm:flex">
        <div className="mr-0 mb-6 sm:mr-4 sm:mb-0">
          <div className="text-3xl font-semibold md:text-5xl">
            Hi 👋
            <br />
            I&apos;m Rob Drury
          </div>
          <br />
          I&apos;m a software developer and amateur game developer living in
          Gothenburg, Sweden.
          <br />
          <br />
          Read more about me{' '}
          <Link className="text-blue-500 hover:text-blue-700" href="/about">
            here
          </Link>
          .
          <div className="mt-16 -ml-5 hidden sm:block">
            <SocialLinks />
          </div>
        </div>
        <Image
          src="/rd.jpeg"
          alt="Photograph of Rob Drury"
          className="w-fit w-min self-start rounded-lg border-2 border-gray-700 sm:max-w-[33%]"
          width={400}
          height={400}
        />
      </div>
      <div className="mt-8 -ml-5 block sm:hidden">
        <SocialLinks />
      </div>
      <hr className="my-8 border-2 border-gray-700 md:my-16" />
      <div className="md:flex md:divide-x-4 md:divide-gray-700">
        <div className="mx-auto pb-20 md:w-1/2 md:pr-8 md:pb-0">
          <div className="b-6 pb-5 text-center text-2xl font-semibold md:mt-0 md:text-3xl">
            Featured projects
          </div>
          <ProjectsEntry
            title="Bardbarian"
            blurb="Spooky Game Jam 24 entry"
            imagePath="/bardbarian banner.png"
            imageAlt="Bardbarian banner"
            hrefPath="https://nightanimal333.itch.io/bardbarian"
            variant="featured"
          />
          <ProjectsEntry
            title="Language Links"
            blurb="Match words in English, Spanish, French, and German"
            imagePath="/language links banner.png"
            imageAlt="Language Links banner"
            hrefPath="https://languagelinks.robdrury.dev"
            variant="featured"
          />
          <ProjectsEntry
            title="Trouble at the Pole"
            blurb="Xmas Game Jam 23 entry"
            imagePath="/tatp cover.png"
            imageAlt="Trouble at the Pole banner"
            hrefPath="https://nightanimal333.itch.io/trouble-at-the-pole"
            variant="featured"
          />
          <Link className="float-right pt-14 text-xl" href="/projects">
            All projects
            <HiArrowRight className="ml-2 inline" size={16} />
          </Link>
        </div>
        <div className="my-8 border-2 border-gray-700 md:hidden" />
        <div className="mx-auto pb-20 md:w-1/2 md:pb-0 md:pl-8">
          <div className="pb-5 text-center text-2xl font-semibold md:text-3xl">
            Most recent posts
          </div>
          <BlogEntryList blogEntries={getSortedPostsMetadata(undefined, 3)} />
          <Link className="float-right pt-14 text-xl" href="/blog">
            All posts
            <HiArrowRight className="ml-2 inline" size={16} />
          </Link>
        </div>
      </div>
    </main>
  )
}
