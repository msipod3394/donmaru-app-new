import React, { useCallback } from 'react'
import useAuth from '@/hooks/useAuth'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ErrorText } from '@/components/atoms/Texts/TextError'
import { TextLink } from '@/components/atoms/Texts/TextLink'
import { SignUpFormInput } from '@/types/SignUpFormInput'
import SignInForm from '@/pages/user/SignUpAndInForm'
import { handleSubmit } from '../HandleSubmit'

export default function SignIn() {
  const { onSignIn, errorMessage } = useAuth()

  // 送信処理
  const handleSignIn = useCallback(
    async (data: SignUpFormInput) => {
      await handleSubmit(data, onSignIn)
    },
    [onSignIn],
  )

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
