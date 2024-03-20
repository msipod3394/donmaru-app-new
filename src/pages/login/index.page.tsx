import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import useAuth from '@/hooks/useAuth'
import LoginForm from '@/components/organisms/SignUpAndInForm'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ErrorText } from '@/components/atoms/Texts/ErrorText'

export type SignUpFormInput = {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const { onSignIn, errorMessage } = useAuth()

  // 送信処理
  const handleSubmit = async (data: SignUpFormInput) => {
    try {
      await onSignIn(data.email, data.password)
    } catch (error: any) {
      console.error('ログインに失敗しました:', error.message)
    }
  }

  return (
    <>
      <PageTitle title='ログイン' />

      {/* エラー */}
      <LoginForm onSubmit={handleSubmit} submitMessage='ログイン' />

      {/* エラー */}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {/* 新規登録はこちら */}
      <Link as={NextLink} mt='1rem' href='/signup' textAlign='center'>
        新規登録はこちら
      </Link>
    </>
  )
}
