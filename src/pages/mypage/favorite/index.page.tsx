import { useFetchFavorites } from '@/hooks/fetch/useFetchFavorites'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

export default function PageFavorite() {
  const router = useRouter()

  // お気に入り情報の取得
  const { fetchFavorites, loading } = useFetchFavorites()

  //
  const clickEditFavorite = () => {
    console.log('clickEditFavorite')
    router.push('/mypage/favorite/edit')
  }

  return (
    <>
      <PageTitle title='お気に入り管理' />
      {loading ? (
        <LoadingIndicator />
      ) : fetchFavorites.length === 0 ? (
        <Text align='center' mb='2rem'>
          お気に入り登録はありません
        </Text>
      ) : (
        <ItemCardList items={fetchFavorites} />
      )}
      <ButtonRounded onClick={clickEditFavorite} className='isDark'>
        編集する
      </ButtonRounded>
    </>
  )
}
