import React, { useCallback, useEffect } from 'react'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { ErrorText } from '@/components/atoms/texts/TextError'
import { TextLink } from '@/components/atoms/texts/TextLink'
import { SignUpFormInput } from '@/types/SignUpFormInput'
import SignInForm from '@/pages/user/SignUpAndInForm'
import { useFetchGetUserLazyQuery } from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { useRouter } from 'next/router'

export default function SignIn() {
  // グローバルにユーザー情報を扱うコンテキスト
  const [user, setUser] = useUserContext()

  const [fetchGetUser, { loading, error, data }] = useFetchGetUserLazyQuery()
  const router = useRouter()

  // エラーメッセージの状態
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // 送信処理
  const handleSignIn = useCallback(
    async (data: SignUpFormInput) => {
      await fetchGetUser({ variables: { email: data.email } })
    },
    [fetchGetUser],
  )

  useEffect(() => {
    console.log(data)

    // データが取得できた場合、success = true として返す
    const success = data && data.getUser ? true : false

    if (success && data) {
      console.log('サインアップ成功！', data.getUser)
      setUser(data.getUser)

      // ローカルストレージにユーザー情報を保存
      const checkUseLocalStorage = typeof window !== 'undefined'
      if (checkUseLocalStorage) {
        localStorage.setItem('loginUser', JSON.stringify(data.getUser))
      }

      // ホーム画面へ遷移
      router.push('/home')
    } else if (error) {
      setErrorMessage('ログインに失敗しました')
    }
  }, [data])

  return (
    <>
      <PageTitle title='ログイン' />

      {/* エラー */}
      <SignInForm onSubmit={handleSignIn} submitMessage='ログイン' />

      {/* エラー */}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {/* 新規登録はこちら */}
      <TextLink text='新規登録はこちら' url='/user/signup' />
    </>
  )
}
