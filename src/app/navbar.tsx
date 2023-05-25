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
    <>
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
    </>
  )
}