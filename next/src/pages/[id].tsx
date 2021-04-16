import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { GetPost, GetPostQuery, GetPostQueryVariables } from '~/generated/graphql'

function PostShow() {
  const router = useRouter()

  const [result] = useQuery<GetPostQuery, GetPostQueryVariables>({
    query: GetPost,
    variables: { id: router.query.id as string },
  })

  return (
    <div>
      <h1 className="text-center text-4xl font-extrabold">{result.data?.post?.title}</h1>
      <div className="border rounded p-4 mt-4">
        <p>{result?.data?.post.body}</p>
      </div>
    </div>
  )
}

export default PostShow
