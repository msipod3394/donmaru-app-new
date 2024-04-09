// ログイン状況のチェック
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DBUser } from '@/types/global_db.types'

export const useCheckLogin = () => {
  const router = useRouter()
  const [getUser, setGetUser] = useState<DBUser>()

  const checkLogin = useCallback(() => {
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
        // router.push('/user/signin') // 一旦コメントアウト
      }
    } else {
      console.error('ローカルストレージが利用できません')
    }
  }, [router])

  useEffect(() => {
    checkLogin()
  }, [checkLogin])

  return { checkLogin, getUser }
}
