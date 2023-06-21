import Image from 'next/image'
import Link from 'next/link'
import { SiGmail, SiLinkedin } from "react-icons/si";
import { HiArrowRight, HiDocument } from "react-icons/hi";
import BlogEntryList from '@/components/BlogEntryList';
import { getSortedPostsMetadata } from '@/utils/posts';

export default function Home() {
  return (
    <>
      <main className="flex justify-around items-center mb-10">
        <div className="mr-4">
          <div className="md:text-5xl text-3xl font-semibold">
            Hi 👋
            <br />
            I&apos;m Rob Drury
          </div>
          <br />
          I&apos;m a software developer and amateur game developer living in Gothenburg, Sweden.
          <br /><br />
          Read more about me <Link className="text-blue-500 hover:text-blue-700" href="/about">here</Link>.
          <div className="flex mt-9">
            <a href="mailto:robjdrewry@gmail.com" target="_blank" className="flex flex-col items-center mr-8">
              <SiGmail size={"2em"} className="mb-1" />
              <div>Email</div>
            </a>
            <Link href="https://www.linkedin.com/in/robert-drury-2b491b48/" target="_blank" className="flex flex-col items-center mr-8">
              <SiLinkedin size={"2em"} className="mb-1" />
              <div>LinkedIn</div>
            </Link>
            <Link href="/Rob_Drury_VisualCV_Resume.pdf" target="_blank" className="flex flex-col items-center">
              <HiDocument size={"2em"} className="mb-1" />
              <div>CV</div>
            </Link>
          </div>
        </div>
        <a target="_blank" href={"/portrait_enlarged.jpg"}>
          <Image src="/portrait.jpeg" alt="Portrait photograph of Rob Drury" className="rounded-lg min-w-[120px] border-2 border-gray-700" width={204} height={304} />
        </a>
      </main>
      <hr className="my-8 md:my-16" />
      <div className="md:flex md:divide-x">
        <div className="md:w-1/2 md:pr-8 mx-auto md:pb-0 pb-20 md:pb-0">
          <div className="mb-7 pb-5 md:mt-0 b-6 text-2xl md:text-3xl font-semibold text-center">
            Featured projects
          </div>
          <div className="flex items-center">
            <Image className="border-2 border-white-700 rounded-lg border-2 border-gray-700" src="/mote banner.png" width={120} height={120} alt="Mote banner" />
            <div className="ml-4">
              <a className="text-xl" href="https://necrosmash.itch.io/mote" target="_blank">
                Mote
              </a>
              <div className="mt-1">
                March Game Jam 2023 entry
              </div>
            </div>
          </div>
          <Link className="pt-14 text-xl float-right" href="/projects">
            All projects
            <HiArrowRight className="ml-2 inline" size={16}/>
          </Link>
        </div>
        <hr className="my-8 md:hide" />
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
    </>
  )
}
