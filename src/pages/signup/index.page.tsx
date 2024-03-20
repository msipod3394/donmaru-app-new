import React from 'react'
import useAuth from '@/hooks/useAuth'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ErrorText } from '@/components/atoms/Texts/ErrorText'
import SignUpForm from '@/components/organisms/SignUpAndInForm'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export type SignUpFormInput = {
  email: string
  password: string
}

export default function SignUp() {
  const router = useRouter()
  const { onSignUp, errorMessage } = useAuth()

  // 送信処理
  const handleSubmit = async (data: SignUpFormInput) => {
    try {
      await onSignUp(data.email, data.password)
    } catch (error: any) {
      console.error('サインアップに失敗しました:', error.message)
    }
  }

  return (
    <>
      <PageTitle title='新規ユーザー登録' />

      <SignUpForm onSubmit={handleSubmit} submitMessage='登録' />

      {/* エラー */}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {/* ログインはこちら */}
      <Link as={NextLink} mt='1rem' href='/login' textAlign='center'>
        ログインはこちら
      </Link>
    </>
  )
}
