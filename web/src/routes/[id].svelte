<script lang="ts">
  import { page } from '$app/stores'
  import { GetPost } from '$lib/generated/graphql'
  import type { GetPostQuery, GetPostQueryVariables } from '$lib/generated/graphql'
  import { onMount } from 'svelte'

  let post: GetPostQuery['post'] | undefined = undefined
  onMount(async () => {
    const { client } = await import('$lib/modules/apollo')

    const { data } = await client.query<GetPostQuery, GetPostQueryVariables>({
      query: GetPost,
      variables: { id: $page.params.id },
    })
    post = data.post
  })
</script>

<h1 class="text-center text-4xl font-extrabold">{post?.title}</h1>
<div class="border rounded p-4 mt-4">
  <p>{post?.body}</p>
</div>
