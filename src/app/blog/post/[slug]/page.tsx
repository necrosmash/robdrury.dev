import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Code } from 'bright'
import Image from 'next/image'
import Link from 'next/link'
import { titleBar } from '@/utils/extension'
import { getBlogPostBySlug, getSortedBlogPostsMetadata } from '@/utils/posts'
import TagsList from '@/components/TagsList'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  const tags = post.data.tags.split(',')
  return (
    <div className="flex justify-center">
      <article className="prose prose-invert md:prose-lg w-full">
        <h2>{post.data.title}</h2>
        <div className="mb-4 text-2xl">
          <div>{getDate(post.data.uploaded)}</div>
          {post.data.updated && (
            <div className="mt-1.5 text-lg italic">
              {`Updated ${getDate(post.data.updated)}`}
            </div>
          )}
        </div>
        <TagsList tags={tags} />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: ({ className, children, ...props }) => {
              const identifierString: string[] = className
                ? className.split(',')
                : []
              if (identifierString.length == 0) {
                return <code>{children}</code>
              } else {
                return (
                  <Code
                    title={
                      identifierString[1] && identifierString[1] !== 'NONAME'
                        ? identifierString[1].replaceAll('_', ' ')
                        : ''
                    }
                    lang={identifierString[0]?.replace('language-', '')}
                    extensions={[titleBar]}
                    theme={'dark-plus'}
                  >
                    {children && (children as string).replace('\n', '')}
                  </Code>
                )
              }
            },
            img: ({ src, alt, title }) => {
              const stringSrc = typeof src === 'string' ? src : undefined
              return (
                <>
                  {/* not spreading props in image, it caused issues with width and height properties*/}
                  <a target="_blank" href={stringSrc}>
                    <Image
                      alt={alt || ''}
                      src={stringSrc || ''}
                      quality={100}
                      title={title}
                      width={900}
                      height={900}
                      className="h-auto w-full"
                    ></Image>
                  </a>
                </>
              )
            },
            h2: ({ node, ...props }) => (
              <h2 id={props.children as string}>
                <a
                  className="font-semibold no-underline"
                  href={`${slug}#${props.children}`}
                >
                  {props.children}
                </a>
              </h2>
            ),
            pre: ({ node, ...props }) => <>{props.children}</>,
            a: ({ node, ...props }) =>
              props.href?.startsWith('/') ? (
                <Link href={props.href}>{props.children}</Link>
              ) : (
                <a target="_blank" href={`${props.href}`}>
                  {props.children}
                </a>
              ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = getSortedBlogPostsMetadata()
  return posts.map((post) => {
    return { slug: post.slug }
  })
}

const getDate = (date: string) => new Date(date).toLocaleDateString('fr-CA')
