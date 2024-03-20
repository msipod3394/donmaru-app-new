import React, { useCallback } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import useAuth from '@/hooks/useAuth'
import SignInForm from '@/components/organisms/SignUpAndInForm'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ErrorText } from '@/components/atoms/Texts/ErrorText'
import { SignUpFormInput } from '@/types/SignUpFormInput'
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
      <Link as={NextLink} mt='1rem' href='/user/signup' textAlign='center'>
        新規登録はこちら
      </Link>
    </>
  )
}
