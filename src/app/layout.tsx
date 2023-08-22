import './globals.css'
import Navbar from './navbar'
import Footer from './footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'robdrury.dev',
  description: "Rob Drury's personal website.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          'container mx-auto max-w-6xl bg-slate-950 px-6 md:px-8'
        }
      >
        <div className="flex h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <div>
            {/* needed for `<Footer />`'s margin to work */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
