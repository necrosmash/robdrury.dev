import { getSortedPostsMetadata } from "@/utils/posts"
import { getPost } from "@/utils/posts"

export default function Page({ params }: { params: { id: string }}) {
  const { id } = params
  const post = getPost(decodeURI(id))

  return (
    <div>{JSON.stringify(post)}</div>
  )
}

export async function generateStaticParams() {
  const posts = getSortedPostsMetadata()
  return posts.map(( post ) => { slug: post.id })
}