import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { ButtonLinkList } from '@/pages/home/ButtonLinkList'
import { MypageLinks } from '@/components/SettingLink'

export default function PageMypage() {
  return (
    <>
      <PageTitle title='マイページ' />
      <ButtonLinkList links={MypageLinks} />
    </>
  )
}
