import { useEffect } from 'react'
import styled from 'styled-components'
import { VStack, HStack, Image } from '@chakra-ui/react'
import { useLoadingState } from '@/hooks/useLoadingState'
import { useFetchDonData } from '@/hooks/useFetchDonData'
import { useAppContext } from '@/contexts/AppContext'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ItemCardShort } from '../../components/molecules/Cards/ItemCardShort'
import { DBDons } from '@/types/global_db.types'

export default function PageAllMenu() {
  const loading = useLoadingState()

  // 全Donsデータ
  const [dons, setDons] = useAppContext()

  // 初回読み込み時、全丼データ取得
  const fetchDons = useFetchDonData()

  // データが取得された後に実行
  useEffect(() => {
    setDons(fetchDons)
  }, [fetchDons])

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {dons &&
        dons.map((item: { item: DBDons }) => <ItemCardShort key={item.id} item={item} />)}
    </>
  )
}

// スタイル
const SBox = styled(HStack)`
  position: relative;
  width: 100%;
  border: 2px solid #000;
  padding: 1rem;
  border-radius: 5px;
`
const SBoxIn = styled(VStack)`
  align-items: flex-start;
`
const SFixButtonArea = styled(VStack)`
  position: fixed;
  bottom: 2.4rem;
`
