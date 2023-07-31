import Image from 'next/image'

export default function About() {
  return (
    <div className="flex">
      <div className="min-w-[50%]">
        <div className="text-xl mb-4 mr-6">
          <p>This site is something of a work-in-progress (the contents of this page included.)</p>
          <p>I&apos;m planning on writing this section more fully in the future.</p>
          <p>For now, here are some bullet points:</p>
        </div>
        <ul className="list-disc ml-4">
          <li>I moved to Gothenburg in 2019</li>
          <li>I have 6 years of professional experience as a developer</li>
          <li>I have 2½ years of professional experience as a frontend developer, specifically</li>
          <li>My main frontend experience is with React</li>
          <li>I have studied (and should soon graduate from) a <em>Game Design & Technology</em> Master&apos;s at Gothenburg University</li>
          <li>I have a very deaf, very white <a className="text-blue-500 hover:text-blue-700" target="_blank" href={"/sammy.jpg"}>cat named Sammy</a></li>
          <li>I&apos;m currently <a className="text-blue-500 hover:text-blue-700" target="_blank" href={"https://drive.google.com/file/d/17gG3UwOcYJOfDavASB_d19o4SbpuG62m/view?usp=sharing"}>looking for work</a> 👀</li>
        </ul>
      </div>
      <div className="hidden sm:block min-w-[40%] self-center">
        <Image src="/wsm3.png" alt="will smith pose" width={400} height={689} />
      </div>
    </div>
  )
}