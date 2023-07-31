import React from "react";
import Link from "next/link";

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
            <div className="flex justify-between">
              <div className="text-lg mt-1">
                {tagsArray.map((tag, index) => (
                  <>
                    <Link key={tag} className="text-blue-500 hover:text-blue-700" href={`/blog/${tag}`}>{tag}</Link>
                    {`${tagsArray.length - 1 !== index ? `, ` : ``}`}
                  </>
                ))}
              </div>
              <div className="self-center whitespace-nowrap ml-5 mt-1">{uploaded}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
