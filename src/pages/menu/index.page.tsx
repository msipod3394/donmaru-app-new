import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ItemCardShort } from '@/components/molecules/Cards/ItemCardShort'
import { DBDons } from '@/types/global_db.types'
import { useFetchItems } from '@/hooks/fetch/useFetchItems'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from './ItemCardList'

export default function PageAllMenu() {
  // 全Donsデータ
  const { fetchItems, loading } = useFetchItems()

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {loading ? <LoadingIndicator /> : <ItemCardList items={fetchItems} />}
    </>
  )
}
