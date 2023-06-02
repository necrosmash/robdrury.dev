import ReactMarkdown from 'react-markdown'
import matter from "gray-matter"
import { Code } from "bright"
import { getSortedPostsMetadata } from "@/utils/posts"
import Image from 'next/image'

export default function Page({ params }: { params: { title: string }}) {
  const { title } = params
  const post = getPost(decodeURI(title))

  return (
    <>
      <h1 className={`mb-3 text-3xl font-semibold`}>{post.data.title}</h1>
      <h2 className={`mb-3 text-2xl font-semibold`}>{post.data.date}</h2>
      <h3 className={`mb-3 text-xl font-semibold`}>{post.data.tags}</h3>
      {/*<div className="prose max-w-4xl">*/}
      <div className="prose">
        <ReactMarkdown components={{
          code: function({className, inline, children, ...props}) {
            if (inline) {
              return (<code {...props}>{children[0]}</code>)
              {/* @ts-expect-error Server Component */}
            } else return (<Code lang={className?.replace("language-", "")}>{children[0]}</Code>)
          },
          img: ({src, alt, title}) => ( 
            <>
              {/* not spreading props in image, it caused issues with width and height properties*/}
              <Image alt={alt || ''} src={src || ''} title={title} width={300} height={300} className="w-fit h-auto"></Image>
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