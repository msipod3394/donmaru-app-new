import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/contexts/UserContext'

// ログイン状況のチェック
export function useLoginCheck() {
  const router = useRouter()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    const checkLogin = () => {
      // ローカルストレージにデータがあるか確認
      const isSetUser = localStorage.getItem('loginUser')

      // ログインデータがなければログイン画面へ
      if (!isSetUser) {
        console.log('ログイン画面へ遷移')
        router.push('/login')
        return
      } else {
        // あれば値をuserステートにセット
        const jsonObject = JSON.parse(isSetUser)
        if (!jsonObject) {
          console.log('ユーザーデータが存在しません')
        } else {
          const { id, email } = jsonObject
          if (!user && id && email) {
            console.log('ユーザーがセットされてないよ')
            setUser({
              id: id,
              email: email,
              user_name: null,
              password: null,
              created_at: '',
              updated_at: '',
            })
          }
        }
      }
    }

    checkLogin()
  }, [router, setUser, user])

  return user
}
