import React from 'react'
import { getSortedPostsMetadata } from '@/utils/posts'
import { tags } from '@/utils/tags'
import BlogEntryList from '@/components/BlogEntryList'

export default function Page({ params }: { params: { tag: string }}) {
  const { tag } = params

  return (
    <BlogEntryList blogEntries={getSortedPostsMetadata(tag)} />
  )
}

export const generateStaticParams = () => (
  tags.map((tag) => tag)
)