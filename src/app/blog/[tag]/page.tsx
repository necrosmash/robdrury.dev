import React from 'react'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi'
import { getSortedPostsMetadata } from '@/utils/posts'
import { tags } from '@/utils/tags'
import BlogEntryList from '@/components/BlogEntryList'

export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = await params

  return (
    <div className="mx-auto grid w-fit max-w-4xl grid-cols-[1fr,auto,1fr] grid-rows-1">
      <Link href="/blog">
        <HiArrowLeft className="mr-2" size={32} />
      </Link>
      <div className="text-2xl font-semibold md:text-3xl">
        Posts tagged <em>{tag}</em>
      </div>
      <div className="col-span-3 row-start-2 justify-self-center">
        <div className="xsm:min-w-[500px]">
          <BlogEntryList blogEntries={getSortedPostsMetadata(tag)} />
        </div>
      </div>
    </div>
  )
}

export const generateStaticParams = () =>
  tags.map((tag) => {
    return { tag: tag }
  })
