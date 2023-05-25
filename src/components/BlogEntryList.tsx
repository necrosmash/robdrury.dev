import React from "react";
import Link from "next/link";
import { PostMetadata } from "@/utils/posts";

export default function BlogEntryList({blogEntries}: {blogEntries: PostMetadata[]}) {
  return (
    <>
      {blogEntries.map(({ id, date, title }) => (
        <li key={id}>
          <Link href={`/blog/post/${id}`}>{id}, {date}, {title}</Link>
        </li>
      ))}
    </>
  )
}
