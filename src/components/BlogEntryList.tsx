import React from "react";
import Link from "next/link";

export default function BlogEntryList({blogEntries}: {blogEntries: PostMetadata[]}) {
  return (
    <ul>
      {blogEntries.map(({ id, date, title }) => (
        <li key={id}>
          <Link href={`/blog/post/${title}`}>{id}, {date}, {title}</Link>
        </li>
      ))}
    </ul>
  )
}
