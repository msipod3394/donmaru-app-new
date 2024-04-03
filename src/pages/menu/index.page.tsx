import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from './ItemCardList'
import { useGetItemsAllQuery } from '@/gql/graphql'
// import { useFetchItems } from '@/hooks/fetch/useFetchItems'

export default function PageAllMenu() {
  // 全Donsデータ
  // const { fetchItems, loading } = useFetchItems()
  // console.log(fetchItems);

  // const { data, loading, error } = useFetchItems()
  const { data, loading, error } = useGetItemsAllQuery()
  // console.log(data)

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {loading ? <LoadingIndicator /> : <ItemCardList data={data} />}
    </>
  )
}
