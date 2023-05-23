//import Image from 'next/image'
import { getSortedPostsMetadata } from '@/utils/posts'
import Link from 'next/link'

/*export default function BlogEntry() {
  return (
    <>
      <Link href="/blog/a">Link to Blog A.</Link>
      <Link href="/blog/b">Link to Blog B.</Link>
    </>
  )
}*/

export default function BlogList() {
  console.log("in Blog/page.tsx")
  return (
    getSortedPostsMetadata().map(({ id, date, title }) => (
      <li key={id}>
        <Link href={`/blog/${id}`}>{id}, {date}, {title}</Link>
      </li>
    )))
}