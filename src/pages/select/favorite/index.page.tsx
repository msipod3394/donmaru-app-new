import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ButtonRounded } from '@/components/atoms/Buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/Texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { Text } from '@chakra-ui/react'
import { Favorite, Item, useFetchFavoriteByEmailQuery, User } from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'

export default function PageSelectFavorite() {
  const router = useRouter()

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<Item[]>([])

  // 結果をステート管理
  const [result, setResult] = useState('')

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  useEffect(() => {
    console.log('user', user)
  }, [user])

  // お気に入り情報の取得
  const {
    data,
    loading,
    refetch: refetchFavoritesByUserEmail,
  } = useFetchFavoriteByEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
  })

  // データが取得された後に実行
  useEffect(() => {
    if (data) {
      console.log('data', data.favorites)
      const filterItems = data.favorites.map((favorite) => favorite.item)
      // console.log('filterItems', filterItems)

      setFavorites(filterItems)
    }
  }, [data])

  useEffect(() => {
    if (favorites.length !== 0) {
      console.log('favorites', favorites)
      const shuffleID = favorites[Math.floor(Math.random() * favorites.length)]
      console.log('shuffle', shuffleID)

      const favoritesID = shuffleID.id
      console.log('丼ID', favoritesID)
      setResult(favoritesID)
    }
  }, [favorites, setFavorites])

  // 結果画面へ遷移
  const clickShowResult = () => {
    router.push(`/select/result/${result}`)
  }

  return (
    <>
      <PageTitle title='お気に入りからガチャ' />
      {loading ? (
        <LoadingIndicator />
      ) : favorites.length === 0 ? (
        <>
          <Text align='center' mb='2rem'>
            お気に入り登録はありません
          </Text>
          <ButtonRounded
            onClick={() => router.push('/mypage/favorite')}
            className='isDark'
          >
            お気に入りを登録しよう
          </ButtonRounded>
        </>
      ) : (
        <>
          <ItemCardList items={favorites} />
          <ButtonRounded onClick={clickShowResult} className='isDark'>
            ガチャする
          </ButtonRounded>
        </>
      )}
    </>
  )
}
