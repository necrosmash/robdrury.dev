import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <div className="flex justify-center">
      <div>
        <div className="text-xl mb-4">
      I&apos;m planning on writing this more fully in the future.
          <br />
      For now, here are some bullet points:
        </div>
        <li>I moved to Gothenburg in 2019</li>
        <li>I&apos;ve mainly worked as a frontend developer</li>
        <li>My main frontend experience is with React, but I have used Vue and Angular too</li>
        <li>I have studied (and should soon graduate from) a <em>Game Design & Technology</em> Master&apos;s at Gothenburg University</li>
        <li>I have a very deaf, very white <a className="text-blue-500" target="_blank" href={"/sammy.jpg"}>cat named Sammy</a></li>
      </div>
    </div>
  )
}