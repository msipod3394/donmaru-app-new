import React, { useEffect } from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { ButtonLinkList } from '@/pages/home/ButtonLinkList'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { useUserContext } from '@/contexts/UserContext'
import { SelectLinks } from '@/components/SettingLink'
import { useQuery, gql } from '@apollo/client'

const GET_POSTS = gql`
  query {
    users {
      id
      email
      password
    }
  }
`
export default function Home() {
  // gql
  const { loading, error, data } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only', // キャッシュの仕方
    onCompleted(data) {
      // 完了時の処理
      console.log('data', data)
    },
    onError: (error) => {
      // エラー時の処理
      console.error('error', error)
    },
  })

  // ユーザー情報
  const { getUser } = useCheckLogin()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  return (
    <>
      <PageTitle title='丼丸ガチャ' />
      <PageDescription>
        本日あなたにぴったりの
        <br />
        海鮮丼を選びます 🐟
      </PageDescription>
      <ButtonLinkList links={SelectLinks} />
    </>
  )
}
