<script lang="ts">
  import { onMount } from 'svelte'
  import { GetPosts } from '$lib/generated/graphql'
  import type { GetPostsQuery } from '$lib/generated/graphql'

  let posts: GetPostsQuery['posts'] = []
  onMount(async () => {
    const { client } = await import('$lib/modules/apollo')
    const { data, errors } = await client.query<GetPostsQuery>({
      query: GetPosts,
    })

    if (errors) console.error(errors)

    posts = data.posts
  })
</script>

<svelte:head>
  <title>Hello world!</title>
</svelte:head>

<h1>投稿一覧</h1>
{#each posts as post}
  <a href={post.id} class="block hover:text-blue-500">
    <span>{post.title}</span>
    <span>著者：{post?.user?.name}</span>
    <span>{post.body}</span>
  </a>
{/each}
