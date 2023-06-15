import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex justify-around items-center">
      <div className="pr-4">
        <div className="text-3xl">
          Hi 👋
          <br />
          I&apos;m Rob Drury
        </div>
        <br />
        I&apos;m a software developer and amateur game developer living in Gothenburg, Sweden.
        <br /><br />
        Read more about me <Link className='text-blue-500' href="/about">here</Link>.
      </div>
      <a target="_blank" href={"/portrait_enlarged.jpg"}>
        <Image src="/portrait.jpeg" alt="Portrait photograph of Rob Drury" className="min-w-[120px]" width={204} height={304} />
      </a>
    </main>
  )
}
