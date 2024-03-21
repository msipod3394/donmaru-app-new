import React, { useCallback } from 'react'
import useAuth from '@/hooks/useAuth'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ErrorText } from '@/components/atoms/Texts/TextError'
import { TextLink } from '@/components/atoms/Texts/TextLink'
import { SignUpFormInput } from '@/types/SignUpFormInput'
import SignUpForm from '@/pages/user/SignUpAndInForm'
import { handleSubmit } from '../HandleSubmit'

export default function SignUp() {
  const { onSignUp, errorMessage } = useAuth()

  // 送信処理
  const handleSignUp = useCallback(
    async (data: SignUpFormInput) => {
      await handleSubmit(data, onSignUp)
    },
    [onSignUp],
  )

  return (
    <>
      <PageTitle title='新規ユーザー登録' />

      <SignUpForm onSubmit={handleSignUp} submitMessage='登録' />

      {/* エラー */}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {/* ログインはこちら */}
      <TextLink text='ログインはこちら' url='/user/signin' />
    </>
  )
}
