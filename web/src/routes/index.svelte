<script lang="ts">
  import { onMount } from 'svelte'
  import { GetPosts } from '$lib/generated/graphql'
  import type { GetPostsQuery } from '$lib/generated/graphql'
  import { client } from '$lib/modules/urql'

  let posts: GetPostsQuery['posts'] = []
  onMount(async () => {
    const { data, error } = await client.query<GetPostsQuery>(GetPosts).toPromise()

    if (error) console.error(error)

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
