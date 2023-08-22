'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div className="mb-16 mt-6 flex flex-col items-center md:mb-24 md:flex-row md:justify-between">
      <Link href={'/'}>
        <h1 className="font-emotionengine text-4xl">robdrury.dev</h1>
      </Link>
      <div className="mt-2 md:mt-0">
        {navLinks.map((link, index) => {
          const isActive =
            (link.name === 'Home' && pathname === '/') ||
            (link.name !== 'Home' && pathname.startsWith(link.href))
          return (
            <Link
              className={`
                ${navLinks.length - 1 !== index && `mr-4`}
                ${isActive && 'rounded-full bg-pink-600'}
                px-3 py-1.5 text-lg font-semibold
              `}
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
