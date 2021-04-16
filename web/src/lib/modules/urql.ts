import { createClient } from '@urql/core'

export const client = createClient({
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://nest-firestore-graphql-dot-kiyo-dev-944.an.r.appspot.com/graphql'
      : 'http://localhost:3000/graphql',
})
