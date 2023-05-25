import Link from 'next/link'
import { getSortedPostsMetadata } from '@/utils/posts'
import BlogEntryList from '@/components/BlogEntryList'

export default function BlogList() {
  return (
    <BlogEntryList blogEntries={getSortedPostsMetadata()} />
  )
}