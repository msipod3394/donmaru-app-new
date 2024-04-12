// ログイン確認
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '@/gql/graphql'

export const useCheckLogin = () => {
  const router = useRouter()
  const [getUser, setGetUser] = useState<User>()

  const checkLogin = () => {
    const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

    // ローカルストレージにログインユーザーのデータがあるかどうか
    if (isLocalStorageAvailable) {
      const isSetUser = window.localStorage.getItem('loginUser')
      if (isSetUser) {
        const jsonObject = JSON.parse(isSetUser)
        setGetUser(jsonObject)
      } else {
        // ログインしていない場合は、ログインページにリダイレクト
        console.log('ログイン画面へ')
        router.push('/user/login')
      }
    } else {
      console.error('ローカルストレージが利用できません')
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return { getUser }
}
