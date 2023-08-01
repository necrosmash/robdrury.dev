import React from "react";
import Link from "next/link";
import { HiTag } from "react-icons/hi";

export default function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="text-base flex space-x-2 pb-2">
      <HiTag size="1.2em" title="tags" className="mt-[5px]" />
      <div>
        {tags.map((tag: string) => (
          <span key={tag}>
            <Link className="text-blue-500 hover:text-blue-700" href={`/blog/${tag}`}>{tag}</Link>
            {tags.indexOf(tag) !== tags.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  )
}