import { useFetchFavorites } from '@/hooks/fetch/useFetchFavorites'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
// import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { useRouter } from 'next/router'
import { useFetchNotFavorites } from '@/hooks/fetch/useFetchNotFavorites'
import { ItemCardList } from './ItemCardList'
import { useFetchItems } from '@/hooks/fetch/useFetchItems'

export default function PageFavoriteEdit() {
  const router = useRouter()

  // お気に入り丼の取得
  const { fetchFavorites, loading } = useFetchFavorites()
  // console.log('fetchFavorites', fetchFavorites)

  // お気に入りではない丼の取得
  const { fetchNotFavorites } = useFetchNotFavorites()
  // console.log('fetchNotFavorites', fetchNotFavorites)

  // 全ての丼を取得
  const { fetchItems } = useFetchItems()
  // console.log('fetchItems', fetchItems)

  return (
    <>
      <PageTitle title='お気に入りの編集' />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ItemCardList items={fetchItems} />

          {/* お気に入り丼一覧 */}
          {/* <ItemCardList items={fetchFavorites} /> */}
          {/* お気に入りではない丼一覧 */}
          {/* <ItemCardList items={fetchNotFavorites} /> */}
        </>
      )}
    </>
  )
}
