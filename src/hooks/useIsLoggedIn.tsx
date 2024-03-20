import React from 'react'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/router'

export const useIsLoggedIn = () => {
  const router = useRouter()
  const { currentUser } = useUser()

  if (!currentUser) {
    console.log('ログイン画面へ')
    router.push('/login')
  }
}
