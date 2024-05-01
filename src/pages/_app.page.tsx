import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/theme/theme'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { UserProvider } from '@/contexts/UserContext'
import { DefaultLayout } from '@/components/templates/DefaultLayout'
import '@/styles/reset.min.css'
import '@/styles/variables.css'
import { setContext } from '@apollo/client/link/context'
import { getStoredAuthToken } from '@/shared/utils/authToken'
import { ThemeProvider } from 'styled-components'

const httpLink = createHttpLink({
  uri: `http://localhost:3001/graphql`,
  credentials: 'include',
})

// 追加
// 認証トークンをキャッシュ化
const authLink = setContext((_, { headers }) => {
  const token = getStoredAuthToken()
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  }
})

// Apollo Clientの初期化
const client: ApolloClient<{}> = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

// DefaultLayoutを適用したくないページがあればパスを記載
const pagesWithoutDefaultLayout: string[] = ['/test']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const useDefaultLayout: boolean = !pagesWithoutDefaultLayout.includes(router.pathname)

  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <UserProvider>
            {useDefaultLayout ? (
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </UserProvider>
        </ApolloProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default MyApp
