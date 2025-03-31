import { HiRss } from 'react-icons/hi'

export default function Footer() {
  return (
    <div className="mt-12 mb-6 flex justify-center">
      <a href="/rss.xml">
        <HiRss size={20} />
      </a>
    </div>
  )
}
