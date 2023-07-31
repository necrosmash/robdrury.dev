import React from "react";
import Link from "next/link";
import { SiGmail, SiLinkedin } from "react-icons/si";
import { HiDocument } from "react-icons/hi";

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-y-4">
      <a href="mailto:robjdrewry@gmail.com" target="_blank" className="w-20 flex flex-col items-center">
        <SiGmail size={"2em"} className="mb-1" />
        <div>Email</div>
      </a>
      <Link href="https://www.linkedin.com/in/robert-drury-2b491b48/" target="_blank" className="w-20 flex flex-col items-center">
        <SiLinkedin size={"2em"} className="mb-1" />
        <div>LinkedIn</div>
      </Link>
      <a href="https://drive.google.com/file/d/17gG3UwOcYJOfDavASB_d19o4SbpuG62m/view?usp=sharing" target="_blank" className="w-20 flex flex-col items-center">
        <HiDocument size={"2em"} className="mb-1" />
        <div>CV</div>
      </a>
    </div>
  )
}