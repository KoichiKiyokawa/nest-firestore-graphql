import 'isomorphic-fetch'
import { createClient, dedupExchange, cacheExchange, fetchExchange, ssrExchange } from '@urql/core'

const isServerSide = typeof window === 'undefined'

// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined,
})

export const client = createClient({
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://nest-firestore-graphql-dot-kiyo-dev-944.an.r.appspot.com/graphql'
      : 'http://localhost:3000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssr, // Add `ssr` in front of the `fetchExchange`
    fetchExchange,
  ],
})
