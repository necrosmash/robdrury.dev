import Image from 'next/image'
import Link from 'next/link'
import { SiGmail, SiLinkedin } from "react-icons/si";
import { HiDocument } from "react-icons/hi";

export default function Home() {
  return (
    <main className="flex justify-around items-center">
      <div className="pr-4">
        <div className="md:text-5xl text-3xl">
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
  )
}
