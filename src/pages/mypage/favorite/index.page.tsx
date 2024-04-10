import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { useUserContext } from '@/contexts/UserContext'
import { Favorite, useFetchFavoriteByEmailQuery } from '@/gql/graphql'
import { ItemCardList } from '../components/ItemCardList'

export default function PageFavorite() {
  const router = useRouter()

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // お気に入りのIDを管理
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isSelected, setIsSelected] = useState<string[]>([])

  // GQLからお気に入り情報の取得
  const {
    data: dataFavorites,
    loading,
    refetch: refetchFavoriteByUserEmail,
  } = useFetchFavoriteByEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
  })

  useEffect(() => {
    if (dataFavorites) {
      const registeredFavorite: string[] = dataFavorites.favorites.map(
        (favorite: Favorite) => {
          return favorite.item.id
        },
      )
      setIsSelected(registeredFavorite)
      setFavorites(dataFavorites.favorites)
    }
  }, [dataFavorites])

  // 編集画面へ遷移
  const clickEditFavorite = () => {
    router.push('/mypage/favorite/edit')
  }

  return (
    <>
      <PageTitle title='お気に入り管理' />
      {loading ? (
        <LoadingIndicator />
      ) : favorites.length === 0 ? (
        <Text align='center' mb='2rem'>
          お気に入り登録はありません
        </Text>
      ) : (
        <ItemCardList items={favorites} />
      )}
      <ButtonRounded onClick={clickEditFavorite} className='isDark'>
        編集する
      </ButtonRounded>
    </>
  )
}
