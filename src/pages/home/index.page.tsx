import { useEffect } from 'react'
import { useCheckLogin } from '@/hooks/useLoginCheck'
import { useUserContext } from '@/contexts/UserContext'
import { SelectLinks } from '@/components/SettingLink'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { PageDescription } from '@/components/atoms/texts/PageDescription'
import { ButtonLinkList } from '@/pages/home/ButtonLinkList'

export default function Home() {
  // ユーザー情報をセット
  const [user, setUser] = useUserContext()
  const checkLogin = useCheckLogin()

  useEffect(() => {
    if (Object.keys(user).length === 0 && checkLogin !== undefined) {
      setUser(checkLogin)
    }
  }, [user, checkLogin])


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
