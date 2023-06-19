import React from 'react'
import Link from 'next/link'
import { HiArrowLeft } from "react-icons/hi";
import { getSortedPostsMetadata } from '@/utils/posts'
import { tags } from '@/utils/tags'
import BlogEntryList from '@/components/BlogEntryList'

export default function Page({ params }: { params: { tag: string }}) {
  const { tag } = params

  return (
    <div className="max-w-4xl grid grid-rows-1 grid-cols-[1fr,auto,1fr] w-fit mx-auto">
      <Link href="/blog">
        <HiArrowLeft className="mr-2" size={32}/>
      </Link>
      <div className="text-2xl font-semibold">Posts tagged <em>{tag}</em></div>
      <div className="row-start-2 col-span-3 justify-self-center">
        <BlogEntryList blogEntries={getSortedPostsMetadata(tag)} />
      </div>
    </div>
  )
}

export const generateStaticParams = () => (
  tags.map((tag) => tag)
)
