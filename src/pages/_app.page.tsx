import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme/theme'
import { useRouter } from 'next/router'
import { DefaultLayout } from '@/components/templates/DefaultLayout'
import type { AppProps } from 'next/app'
import { AppProvider } from '@/contexts/AppContext'
import { UserProvider } from '@/contexts/UserContext'
import '@/styles/reset.min.css'
import '@/styles/variables.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Apollo Clientの初期化
const client: ApolloClient<{}> = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
})

// DefaultLayoutを適用したくないページがあればパスを記載
const pagesWithoutDefaultLayout: string[] = ['/test']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const useDefaultLayout: boolean = !pagesWithoutDefaultLayout.includes(router.pathname)

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <AppProvider>
          <UserProvider>
            {useDefaultLayout ? (
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </UserProvider>
        </AppProvider>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
