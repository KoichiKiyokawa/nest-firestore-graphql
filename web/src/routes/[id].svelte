<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { GetPost } from '$lib/generated/graphql'
  import type { GetPostQuery, GetPostQueryVariables } from '$lib/generated/graphql'
  import { client } from '$lib/modules/urql'

  export const load: Load = async ({ page, fetch }) => {
    const { data, error } = await client(fetch)
      .query<GetPostQuery, GetPostQueryVariables>(GetPost, { id: page.params.id })
      .toPromise()

    if (error) console.error(error)

    return {
      props: { post: data.post },
    }
  }
</script>

<script lang="ts">
  export let post: GetPostQuery['post'] | undefined = undefined
</script>

<h1 class="text-center text-4xl font-extrabold">{post?.title}</h1>
<div class="border rounded p-4 mt-4">
  <p>{post?.body}</p>
</div>
