import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { useFetchItemsQuery } from '@/gql/graphql'
import { ItemCardList } from './ItemCardList'

export default function PageFavoriteEdit() {
  // 全ての丼を取得
  const { data, loading } = useFetchItemsQuery()

  return (
    <>
      <PageTitle title='お気に入りの編集' />
      {loading ? <LoadingIndicator /> : data && <ItemCardList items={data.items} />}
    </>
  )
}
