import { AppProps } from 'next/app'
import { NextComponentType, withUrqlClient } from 'next-urql'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="mx-4 mt-4">
      <Component {...pageProps} />
    </main>
  )
}

export default withUrqlClient(() => ({
  url: 'https://nest-firestore-graphql-dot-kiyo-dev-944.an.r.appspot.com/graphql',
}))(MyApp as NextComponentType)
