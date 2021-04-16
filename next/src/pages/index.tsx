import Link from 'next/link'
import { useQuery } from 'urql'
import { GetPosts, GetPostsQuery } from '~/generated/graphql'

export default function Home() {
  const [result] = useQuery<GetPostsQuery>({ query: GetPosts })

  const posts = result.data?.posts
  if (posts === undefined) return <p>投稿がありません</p>

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link href={post.id}>
          <div className="border p-2 space-x-2 cursor-pointer">
            <span>{post.title}</span>
            <span>{post.body}</span>
            <span>投稿者：{post.user.name}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
