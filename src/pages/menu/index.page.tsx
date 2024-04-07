import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { useGetItemsQuery } from '@/gql/graphql'
import { ItemCardList } from '@/components/molecules/ItemCardList'

export default function PageAllMenu() {
  // 全Donsデータ
  const { data, loading, error } = useGetItemsQuery()

  return (
    <>
      <PageTitle title='メニュー一覧' />
      {loading ? <LoadingIndicator /> : <ItemCardList items={data.items} />}
    </>
  )
}
