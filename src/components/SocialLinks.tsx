import React from 'react'
import Link from 'next/link'
import { SiGithub, SiGmail, SiLinkedin, SiMastodon } from 'react-icons/si'
import { HiDocument } from 'react-icons/hi'

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-y-4">
      <a
        href="mailto:robjdrewry@gmail.com"
        target="_blank"
        className="flex w-20 flex-col items-center"
      >
        <SiGmail size={'2em'} className="mb-1" />
        <div>Email</div>
      </a>
      <Link
        href="https://www.github.com/necrosmash"
        target="_blank"
        className="flex w-20 flex-col items-center"
      >
        <SiGithub size={'2em'} className="mb-1" />
        <div>GitHub</div>
      </Link>
      <Link
        href="https://mastodon.gamedev.place/@necrosmash"
        target="_blank"
        className="flex w-20 flex-col items-center"
      >
        <SiMastodon size={'2em'} className="mb-1" />
        <div>Mastodon</div>
      </Link>
      <Link
        href="https://www.linkedin.com/in/robert-drury-2b491b48/"
        target="_blank"
        className="flex w-20 flex-col items-center"
      >
        <SiLinkedin size={'2em'} className="mb-1" />
        <div>LinkedIn</div>
      </Link>
      <a
        href="https://drive.google.com/file/d/1dyrPQ6-MOGTh2x30y1SKkEbhXAnj42G6/view?usp=sharing"
        target="_blank"
        className="flex w-20 flex-col items-center"
      >
        <HiDocument size={'2em'} className="mb-1" />
        <div>CV</div>
      </a>
    </div>
  )
}
