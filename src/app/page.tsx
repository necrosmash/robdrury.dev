import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight } from "react-icons/hi";
import BlogEntryList from '@/components/BlogEntryList';
import SocialLinks from '@/components/SocialLinks';
import TagsList from '@/components/TagsList';
import { getSortedPostsMetadata } from '@/utils/posts';

export default function Home() {
  return (
    <main>
      <div className="sm:flex justify-between">
        <div className="sm:mr-4 mr-0 sm:mb-0 mb-6">
          <div className="md:text-5xl text-3xl font-semibold">
              Hi 👋
            <br />
            I&apos;m Rob Drury
          </div>
          <br />
          I&apos;m a software developer and amateur game developer living in Gothenburg, Sweden.
          <br /><br />
          Read more about me <Link className="text-blue-500 hover:text-blue-700" href="/about">here</Link>.
          <div className="hidden sm:block mt-16 -ml-5">
            <SocialLinks />
          </div>
        </div>
        <Image src="/rd.jpeg" alt="Photograph of Rob Drury" className="self-start rounded-lg w-fit sm:max-w-[33%] w-min border-2 border-gray-700" width={400} height={400} />
      </div>
      <div className="block sm:hidden mt-8 -ml-5">
        <SocialLinks />
      </div>
      <hr className="my-8 md:my-16 border-gray-700 border-2"/>
      <div className="md:flex md:divide-x-4 md:divide-gray-700">
        <div className="md:w-1/2 md:pr-8 mx-auto md:pb-0 pb-20 md:pb-0">
          <div className="pb-5 md:mt-0 b-6 text-2xl md:text-3xl font-semibold text-center">
            Featured projects
          </div>
          <div className="mt-7 flex items-center">
            <Image className="rounded-lg border-2 border-gray-700" src="/mote banner.png" width={120} height={120} alt="Mote banner" />
            <div className="ml-4">
              <a className="text-xl" href="https://necrosmash.itch.io/mote" target="_blank">
                Mote
              </a>
              <div className="mt-1">
                March Game Jam 2023 entry
              </div>
            </div>
          </div>
          <div className="mt-7 flex items-center">
            <Image className="rounded-lg border-2 border-gray-700" src="/thesis prototype banner.png" width={120} height={120} alt="Thesis prototyping banner" />
            <div className="ml-4">
              <a className="text-xl" href="https://github.com/necrosmash/thesis_prototype" target="_blank">
                Thesis prototype
              </a>
              <div className="mt-1">
                Generating story with ChatGPT via player input and enemy traits
              </div>
              <TagsList tags={['thesis']} />
            </div>
          </div>
          <Link className="pt-14 text-xl float-right" href="/projects">
            All projects
            <HiArrowRight className="ml-2 inline" size={16}/>
          </Link>
        </div>
        <div className="my-8 md:hidden border-gray-700 border-2" />
        <div className="md:w-1/2 pb-20 md:pb-0 md:pl-8 mx-auto">
          <div className="pb-5 text-2xl md:text-3xl font-semibold text-center">
            Most recent posts
          </div>
          <BlogEntryList blogEntries={getSortedPostsMetadata(undefined, 3)} />
          <Link className="pt-14 text-xl float-right" href="/blog">
            All posts
            <HiArrowRight className="ml-2 inline" size={16}/>
          </Link>
        </div>
      </div>
    </main>
  )
}
