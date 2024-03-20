import React, { useCallback } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import useAuth from '@/hooks/useAuth'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ErrorText } from '@/components/atoms/Texts/ErrorText'
import SignUpForm from '@/components/organisms/SignUpAndInForm'
import { SignUpFormInput } from '@/types/SignUpFormInput'
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
      <Link as={NextLink} mt='1rem' href='/user/signin' textAlign='center'>
        ログインはこちら
      </Link>
    </>
  )
}
