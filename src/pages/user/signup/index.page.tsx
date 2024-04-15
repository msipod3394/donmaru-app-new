import React, { useCallback } from 'react'
import useAuth from '@/hooks/useAuth'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { ErrorText } from '@/components/atoms/texts/TextError'
import { TextLink } from '@/components/atoms/texts/TextLink'
import { AuthFormInput } from '@/types/AuthFormInput'
import AuthForm from '@/pages/user/AuthForm'
import { handleSubmit } from '../HandleSubmit'

export default function SignUp() {
  const { onSignUp, errorMessage } = useAuth()

  // 送信処理
  const handleSignUp = useCallback(
    async (data: AuthFormInput) => {
      await handleSubmit(data, onSignUp)
    },
    [onSignUp],
  )

  return (
    <>
      <PageTitle title='新規ユーザー登録' />

      <AuthForm onSubmit={handleSignUp} submitMessage='登録' />

      {/* エラー */}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {/* ログインはこちら */}
      <TextLink text='ログインはこちら' url='/user/signin' />
    </>
  )
}
