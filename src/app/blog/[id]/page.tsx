import { getSortedPostsMetadata } from "@/utils/posts"
import { getPost } from "@/utils/posts"

export default function Page({ params }: { params: { id: string }}) {
  console.log("in Blog/[id]/page.tsx - Page")
  const { id } = params
  const post = getPost(decodeURI(id))

  return (
    <>
      <div>{JSON.stringify(post)}</div>
    </>
  )
}

export async function generateStaticParams() {
  const posts = getSortedPostsMetadata()
  return posts.map(( post ) => {
    console.log("in Blog/[id]/page.tsx - generateStaticParams")
    return { slug: post.id }
  })
}