import React from "react";
import Link from "next/link";
import TagsList from "@/components/TagsList";

export default function BlogEntryList({blogEntries}: {blogEntries: PostMetadata[]}) {
  return (
    <ul className="mt-7">
      {blogEntries.map(({ id, uploaded, title, tags }, index) => {
        const tagsArray = tags.split(',')
        return (
          <li key={id} className={`
            ${index != 0 && `mt-7`}
          `}>
            <Link className="text-xl" href={`/blog/post/${title}`}>
              {title}
            </Link>
            <div className="flex justify-between mt-1">
              <TagsList tags={tagsArray} />
              <div className="self-center whitespace-nowrap ml-5">{uploaded}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
