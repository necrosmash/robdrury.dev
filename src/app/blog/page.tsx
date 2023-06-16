import { getSortedPostsMetadata } from '@/utils/posts'
import BlogEntryList from '@/components/BlogEntryList'

export default function BlogList() {
  return (
    <>
      <div className="text-4xl font-semibold">
        All posts
      </div>
      <BlogEntryList blogEntries={getSortedPostsMetadata()} />
    </>
  )
}