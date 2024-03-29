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
  // 全ての丼を取得
  const { fetchItems, loading } = useFetchItems()

  return (
    <>
      <PageTitle title='お気に入りの編集' />
      {loading ? <LoadingIndicator /> : <ItemCardList items={fetchItems} />}
    </>
  )
}
