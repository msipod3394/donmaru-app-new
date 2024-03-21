import React, { useEffect } from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { GachaList } from '@/pages/home/GachaList'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { useUserContext } from '@/contexts/UserContext'

export default function Home() {
  // ユーザー情報
  const getUser = useLoginCheck()
  const [, setUser] = useUserContext()

  useEffect(() => {
    console.log('ユーザー情報', getUser)

    if (getUser) {
      setUser({
        id: getUser.id,
        email: getUser.email,
        user_name: '',
        password: '',
        created_at: '',
        updated_at: '',
      })
    }
  }, [])

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
