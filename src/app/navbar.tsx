'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center md:mb-24 mb-16">
      <Link href={"/"}><h1 className='text-4xl font-emotionengine'>robdrury.dev</h1></Link>
      <div className="mt-2 md:mt-0">
        {navLinks.map((link, index) => {
          const isActive = (
            (link.name === "Home" && pathname === "/") ||
          (link.name !== "Home" && pathname.startsWith(link.href))
          );
          return (
            <Link
              className={isActive ? 'text-pink-500' : 'text-blue-500'}
              href={link.href}
              key={link.name}
            >
              {link.name}
              {navLinks.length - 1 !== index && <span className={'text-white'}>&nbsp;|&nbsp;</span>}
            </Link>
          );
        })}
      </div>
    </div>
  )
}