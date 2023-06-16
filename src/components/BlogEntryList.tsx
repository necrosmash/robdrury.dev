import React from "react";
import Link from "next/link";

export default function BlogEntryList({blogEntries}: {blogEntries: PostMetadata[]}) {
  return (
    <ul className="w-fit">
      {blogEntries.map(({ id, date, title, tags }, index) => {
        const tagsArray = tags.split(',')
        return (
          <li key={id} className={`
            ${index == 0 ? `mt-6` : `mt-3`}
          `}>
            <Link className="text-xl" href={`/blog/post/${title}`}>
              {title}
            </Link>
            <div className="flex justify-between">
              <div>
                tags:&nbsp;
                {tagsArray.map((tag, index) => (
                  <>
                    <Link key={tag} className="text-[#3182ce]" href={`/blog/${tag}`}>{tag}</Link>
                    {`${tagsArray.length - 1 !== index ? `, ` : ``}`}
                  </>
                ))}
              </div>
              <div>{date}</div>
            </div>
          </li>
        )})}
    </ul>
  )
}
