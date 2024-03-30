import React, { useEffect } from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { ButtonLinkList } from '@/pages/home/ButtonLinkList'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { useUserContext } from '@/contexts/UserContext'
import { SelectLinks } from '@/components/SettingLink'
import { useFetchUser } from '@/hooks/gql/useFetchUser'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'

export default function Home() {
  // gql
  const { loading, error, data } = useFetchUser()

  // ユーザー情報
  const { getUser } = useCheckLogin()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    setUser(getUser)
  }, [getUser])

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <PageTitle title='丼丸ガチャ' />
          <PageDescription>
            本日あなたにぴったりの
            <br />
            海鮮丼を選びます 🐟
          </PageDescription>
          <ButtonLinkList links={SelectLinks} />
        </>
      )}
    </>
  )
}
