import { HiRss } from 'react-icons/hi'

export default function Footer() {
  return (
    <div className="mb-6 mt-12 flex justify-center">
      <a href="/rss.xml">
        <HiRss size={20} />
      </a>
    </div>
  )
}
