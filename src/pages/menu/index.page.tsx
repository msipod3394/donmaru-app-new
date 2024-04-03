import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { ItemCardShort } from '@/components/molecules/Cards/ItemCardShort'
import { DBDons } from '@/types/global_db.types'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from './ItemCardList'
import { useFetchItems } from '@/hooks/gql/useFetchItems'
// import { useFetchItems } from '@/hooks/fetch/useFetchItems'

export default function PageAllMenu() {
  // 全Donsデータ
  // const { fetchItems, loading } = useFetchItems()
  // console.log(fetchItems);

  const { data, loading, error } = useFetchItems()

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {loading ? <LoadingIndicator /> : <ItemCardList data={data} />}
    </>
  )
}
