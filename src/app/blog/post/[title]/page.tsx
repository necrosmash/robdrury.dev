import ReactMarkdown from 'react-markdown'
import matter from "gray-matter"
import { Code } from "bright"
import { HiTag } from "react-icons/hi";
import Image from 'next/image'
import Link from "next/link"
import { titleBar } from "@/utils/extension"
import { getSortedPostsMetadata } from "@/utils/posts"

export default function Page({ params }: { params: { title: string } }) {
  const { title } = params
  const post = getPost(decodeURI(title))
  const tags = post.data.tags.split(",")

  return (
    <div className="flex justify-center">
      <article className="w-full prose md:prose-lg prose-invert">
        <h2>{post.data.title}</h2>
        <div className="text-2xl mb-4">
          <div>
            {getDate(post.data.uploaded)}
          </div>
          {post.data.updated && (
            <div className="italic text-lg mt-1.5">
              {`Updated ${getDate(post.data.updated)}`}
            </div>
          )}
        </div>
        <div className="text-base flex space-x-2 pb-2">
          <HiTag size="1.2em" title="tags" className="mt-[5px]" />
          <div>
            {tags.map((tag: string) => (
              <span key={tag}>
                <Link /*className="text-[#3182ce]"*/ href={`/blog/${tag}`}>{tag}</Link>
                {tags.indexOf(tag) !== tags.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
        <ReactMarkdown
          components={{
            code: function ({ className, inline, children, ...props }) {
              if (inline) {
                return (<code {...props}>{children[0]}</code>)
              } else {
                const identifierString: string[] = className ? className.split(",") : []
                return (
                  <div>
                    {/* @ts-expect-error Server Component */}
                    <Code
                      title={
                        (identifierString[1] && identifierString[1] !== "NONAME") ?
                          identifierString[1].replaceAll('_', ' ') :
                          ""
                      }
                      lang={identifierString[0]?.replace("language-", "")}
                      extensions={[titleBar]}
                      theme={"dark-plus"}
                    >
                      {children[0] && (children[0] as string).replace("\n", "")}
                    </Code>
                  </div>
                )
              }
            },
            img: ({ src, alt, title }) => (
              <>
                {/* not spreading props in image, it caused issues with width and height properties*/}
                <a target="_blank" href={src}><Image alt={alt || ""} src={src || ""} title={title} width={900} height={900} className="w-full h-auto"></Image></a>
              </>
            ),
            h2: ({ node, ...props }) => (<h2 id={props.children[0] as string}><a className="font-semibold no-underline" href={`${title}#${props.children[0]}`}>{props.children}</a></h2>),
            h3: ({ node, ...props }) => (<h3 id={props.children[0] as string}><a className="font-semibold no-underline" href={`${title}#${props.children[0]}`}>{props.children}</a></h3>),
            pre: ({ node, ...props }) => (<>{props.children}</>),
            a: ({ node, ...props }) => (
              props.href?.startsWith('/') ?
                (<Link href={props.href}>{props.children}</Link>) :
                (<a target="_blank" href={`${props.href}`}>{props.children}</a>)
            ),
          }}>{post.content}</ReactMarkdown>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = getSortedPostsMetadata()
  return posts.map((post) => { post.title })
}

const getPost = (title: string) => {
  const post = matter.read(`blogPosts/${title}.md`)
  return { data: post.data, content: post.content }
}

const getDate = (date: string) => (
  new Date(date).toLocaleDateString('fr-CA')
)