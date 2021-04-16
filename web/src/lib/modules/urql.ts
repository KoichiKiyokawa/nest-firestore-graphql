import { createClient, dedupExchange, cacheExchange, fetchExchange, ssrExchange } from '@urql/core'
import type { Client } from '@urql/core'
import { serverURL } from '$lib/env'

const isServerSide = typeof window === 'undefined'

// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined,
})

export const client = (fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response>): Client =>
  createClient({
    fetch: fetcher,
    url: serverURL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssr, // Add `ssr` in front of the `fetchExchange`
      fetchExchange,
    ],
  })
