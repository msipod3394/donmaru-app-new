/* eslint-disable react/react-in-jsx-scope */
// pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme/theme'
import { useRouter } from 'next/router'
import { DefaultLayout } from '@/components/templates/DefaultLayout'
import type { AppProps } from 'next/app'
import '@/styles/variables.css'
import { AppProvider } from '@/contexts/AppContext'

// DefaultLayoutを適用したくないページがあればパスを記載
const pagesWithoutDefaultLayout: string[] = ['/test']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const useDefaultLayout: boolean = !pagesWithoutDefaultLayout.includes(router.pathname)

  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        {useDefaultLayout ? (
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </AppProvider>
    </ChakraProvider>
  )
}

export default MyApp
