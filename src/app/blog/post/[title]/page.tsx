import ReactMarkdown from 'react-markdown'
import matter from "gray-matter"
import { Code } from "bright"
import Image from 'next/image'
import { titleBar } from "@/utils/extension"
import { getSortedPostsMetadata } from "@/utils/posts"

export default function Page({ params }: { params: { title: string }}) {
  const { title } = params
  const post = getPost(decodeURI(title))

  return (
    <>
      <h1 className={`mb-3 text-3xl font-semibold`}>{post.data.title}</h1>
      <h2 className={`mb-3 text-2xl font-semibold`}>{post.data.date}</h2>
      <h3 className={`mb-3 text-l font-semibold`}>{post.data.tags}</h3>
      {/*<div className="prose max-w-4xl">*/}
      <div className="prose">
        <ReactMarkdown components={{
          code: function({className, inline, children, ...props}) {
            if (inline) {
              return (<code {...props}>{children[0]}</code>)
            } else {
              const identifierString: string[] = className ? className.split(",") : []
              {/* @ts-expect-error Server Component */}
              return (<Code 
                title={
                  (identifierString[1] && identifierString[1]!== "NONAME") ?
                    identifierString[1].replaceAll('_', ' ') :
                    ""
                }
                lang={identifierString[0]?.replace("language-", "")}
                extensions={[titleBar]}
              >
                {children[0] && (children[0] as string).replace("\n", "")}
              </Code>
              )
            }
          },
          img: ({src, alt, title}) => (
            <>
              {/* not spreading props in image, it caused issues with width and height properties*/}
              <a target="_blank" href={src}><Image alt={alt || ""} src={src || ""} title={title} width={900} height={900} className="w-full h-auto"></Image></a>
            </>
          ),
          pre: ({node, ...props}) => (<>{props.children}</>)
        }}>{post.content}</ReactMarkdown>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const posts = getSortedPostsMetadata()
  return posts.map(( post ) => { post.title })
}

const getPost = (title: string) => {
  const post = matter.read(`blogPosts/${title}.md`)
  return { data: post.data, content: post.content }
}