import Image from 'next/image'

export default function About() {
  return (
    <div className="flex content-center">
      <div className="min-w-[50%]">
        <div className="text-xl mb-4 mt-8 mr-6">
          I&apos;m planning on writing this more fully in the future.
          <br />
          For now, here are some bullet points:
        </div>
        <li>I moved to Gothenburg in 2019</li>
        <li>I have 6 years of professional experience as a developer</li>
        <li>I have 2½ years of professional experience as a frontend developer, specifically</li>
        <li>My main frontend experience is with React</li>
        <li>I have studied (and should soon graduate from) a <em>Game Design & Technology</em> Master&apos;s at Gothenburg University</li>
        <li>I have a very deaf, very white <a className="text-blue-500 hover:text-blue-700" target="_blank" href={"/sammy.jpg"}>cat named Sammy</a></li>
        <li>I'm currently <a className="text-blue-500 hover:text-blue-700" target="_blank" href={"/Rob_Drury_VisualCV_Resume.pdf"}>looking for work</a> 👀</li>
      </div>
      <div className="hidden sm:block min-w-[40%] self-center">
        <Image src="/wsm3.png" alt="will smith pose" width={400} height={689} />
      </div>
    </div>
  )
}