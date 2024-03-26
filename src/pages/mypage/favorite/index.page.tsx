import { useFetchFavorites } from '@/hooks/fetch/useFetchFavorites'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'

export default function PageFavorite() {
  // 注文情報の取得
  const { fetchFavorites, loading } = useFetchFavorites()

  return (
    <>
      <PageTitle title='お気に入り管理' />
      {loading ? (
        <LoadingIndicator />
      ) : fetchFavorites.length === 0 ? (
        <p>注文履歴はありません</p>
      ) : (
        <ItemCardList items={fetchFavorites} />
      )}
    </>
  )
}
