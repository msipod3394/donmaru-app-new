import { useEffect } from 'react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { PageDescription } from '@/components/atoms/Texts/PageDescription'
import { ButtonLinkList } from '@/pages/home/ButtonLinkList'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { useUserContext } from '@/contexts/UserContext'
import { SelectLinks } from '@/components/SettingLink'

export default function Home() {
  // ユーザー情報をセット
  const { getUser } = useCheckLogin()
  const [, setUser] = useUserContext()

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
