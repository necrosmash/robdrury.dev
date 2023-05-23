import './globals.css'
import Navbar from './navbar'
// import Footer from './footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'robdrury.dev',
  description: 'Rob Drury\'s personal website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <body> */}
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
