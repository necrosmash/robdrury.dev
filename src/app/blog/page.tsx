import { getSortedPostsMetadata } from '@/utils/posts'
import BlogEntryList from '@/components/BlogEntryList'

export default function BlogList() {
  return (
    <div className="mx-auto w-fit max-w-4xl">
      <div className="text-center text-2xl font-semibold md:text-3xl">
        All posts
      </div>
      <div className="xsm:min-w-[500px]">
        <BlogEntryList blogEntries={getSortedPostsMetadata()} />
      </div>
    </div>
  )
}
