import React, { useEffect } from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ButtonLinkList } from '@/pages/home/ButtonLinkList'
import { useLoginCheck } from '@/hooks/useLoginCheck'
import { useUserContext } from '@/contexts/UserContext'
import { MypageLinks } from '@/components/SettingLink'

export default function PageMypage() {
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
      <PageTitle title='マイページ' />
      <ButtonLinkList links={MypageLinks} />
    </>
  )
}
