import { HiRss } from 'react-icons/hi'

export default function Footer() {
  return (
    <div className="flex justify-center mt-12 mb-6">
      <a href="/rss.xml">
        <HiRss size={20} />
      </a>
    </div>
  )
}
