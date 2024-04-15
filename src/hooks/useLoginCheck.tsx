import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '@/gql/graphql'

export const useCheckLogin = () => {
  const router = useRouter()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const checkLogin = async () => {
      const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

      // ローカルストレージにログインユーザーのデータがあるかどうか
      if (isLocalStorageAvailable) {
        const isSetUser = window.localStorage.getItem('loginUser')
        if (isSetUser) {
          const jsonObject = JSON.parse(isSetUser)
          setUser(jsonObject)
        } else {
          // ログインしていない場合は、ログインページにリダイレクト
          console.log('ログイン画面へ')
          // router.push('/user/login')
        }
      } else {
        console.error('ローカルストレージが利用できません')
      }
    }

    checkLogin()
  }, [])

  return user
}
