import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '@/gql/graphql'

export const useCheckLogin = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const checkLogin = async () => {
      // ローカルストレージが利用可能か
      const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

      // ローカルストレージにauthTokenがあるか
      if (isLocalStorageAvailable) {
        const authToken = window.localStorage.getItem('authToken')
        const authUser = window.localStorage.getItem('user')

        if (authToken && authUser) {
          const convertJsonObj = JSON.parse(authUser)
          setUser(convertJsonObj)
        } else {
          // ログインしていなければ、ログインページにリダイレクト
          console.log('ログイン画面へ')
          router.push('/auth/SignIn')
        }
      } else {
        console.error('ローカルストレージが利用できません')
      }
    }

    checkLogin()
  }, [])

  return user
}
