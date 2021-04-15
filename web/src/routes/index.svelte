<script lang="ts">
  import { ApolloClient, InMemoryCache } from '@apollo/client'
  import { GetPost, GetPostQuery } from 'src/generated/graphql'
  import { onMount } from 'svelte'

  const client = new ApolloClient({
    uri: 'http"//localhost:3000/graphql',
    cache: new InMemoryCache(),
  })

  let post: GetPostQuery['post']

  onMount(async () => {
    const { data, errors } = await client.query<GetPostQuery>({ query: GetPost })
    if (errors) console.error(errors)
    post = data.post
  })
</script>

<svelte:head>
  <title>Hello world!</title>
</svelte:head>

<main>
  <h1>{post.title}</h1>
  <p>著者：{post.user.name}</p>

  <p>{post.body}</p>
</main>
