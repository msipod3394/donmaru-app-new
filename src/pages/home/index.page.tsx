import React, { useEffect } from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { GachaList } from '@/pages/home/GachaList'
import { useLoginCheck } from '@/hooks/useLoginCheck'

export default function Home() {
  const user = useLoginCheck()

  useEffect(() => {
    console.log('ユーザー情報', user)
  }, [user])

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
