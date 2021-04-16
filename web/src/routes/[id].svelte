<script lang="ts">
  import { page } from '$app/stores'
  import { GetPost } from '$lib/generated/graphql'
  import type { GetPostQuery, GetPostQueryVariables } from '$lib/generated/graphql'
  import { onMount } from 'svelte'
  import { client } from '$lib/modules/urql'

  let post: GetPostQuery['post'] | undefined = undefined
  onMount(async () => {
    const { data } = await client
      .query<GetPostQuery, GetPostQueryVariables>(GetPost, { id: $page.params.id })
      .toPromise()
    post = data.post
  })
</script>

<h1 class="text-center text-4xl font-extrabold">{post?.title}</h1>
<div class="border rounded p-4 mt-4">
  <p>{post?.body}</p>
</div>
