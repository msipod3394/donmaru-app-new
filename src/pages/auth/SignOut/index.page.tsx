import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { onSignOut } from '@/shared/utils/authAction'
import { getStoredAuthToken } from '@/shared/utils/authToken'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/texts/PageTitle'

export default function SignOut() {
  const client = useApolloClient()
  const router = useRouter()

  const handleSignOut = async () => {
    const token = getStoredAuthToken()

    if (!token) {
      // 認証トークンが存在しない場合はサインインページにリダイレクト
      router.push('/auth/SignIn')
      return
    }

    try {
      // クライアントサイドでのみ localStorage を操作
      if (typeof window !== 'undefined') {
        // 認証トークンを削除
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')

        // サインアウト処理を実行
        await onSignOut(token)

        // Apolloクライアントのキャッシュをクリア
        client.clearStore()

        // アラートで削除に成功したことを表示
        alert('サインアウトしました')

        // ログアウト後にサインインページにリダイレクト
        router.push('/auth/SignIn')
      }
    } catch (error) {
      // エラー処理
      console.error('エラー:', error)
    }
  }

  return (
    <>
      <PageTitle title='ログアウト' />
      <ButtonRounded onClick={handleSignOut} className='isDark'>
        ログアウト
      </ButtonRounded>
    </>
  )
}
