import React, { useEffect } from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { GachaList } from '@/pages/home/GachaList'
import { useUserContext } from '@/contexts/UserContext'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [user] = useUserContext()

  // ログインしていない場合はログイン画面へ
  useEffect(() => {
    if (!user || user.id === '') {
      console.log('ログイン画面へ遷移')
      router.push('/login')
    }
  }, [router, user])

  return (
    <>
      <PageTitle title='丼丸ガチャ' />
      <PageDescription>
        本日あなたにぴったりの
        <br />
        海鮮丼を選びます 🐟
      </PageDescription>
      <GachaList />
    </>
  )
}
