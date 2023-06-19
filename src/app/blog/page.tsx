import { getSortedPostsMetadata } from '@/utils/posts'
import BlogEntryList from '@/components/BlogEntryList'

export default function BlogList() {
  return (
    <div className="w-fit mx-auto">
      <div className="text-2xl font-semibold text-center">
        All posts
      </div>
      <BlogEntryList blogEntries={getSortedPostsMetadata()} />
    </div>
  )
}