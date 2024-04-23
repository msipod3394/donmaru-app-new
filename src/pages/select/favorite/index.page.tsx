import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'
import { Order, useFetchFavoriteByIdQuery, useFetchOrderByIdQuery } from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from '@/components/molecules/ItemCardList'
import { ItemWithCount } from '@/types/ItemWithCount'

export default function PageSelectFavorite() {
  const router = useRouter()

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<ItemWithCount[]>([])

  // 結果をステート管理
  const [result, setResult] = useState<string>()

  // 注文履歴カウント
  const [orders, setOrders] = useState<Order[]>([])
  const [count, setCount] = useState<{ id: string; count: number }[]>([])

  // loading状態を管理
  const [loading, setLoading] = useState(false)

  // ユーザー情報をセット
  const [user] = useUserContext()

  // お気に入りの取得
  const { data: favoriteData, refetch: refetchFavoritesByUserId } =
    useFetchFavoriteByIdQuery({
      variables: { id: user && user.id ? String(user.id) : null },
      skip: !user,
      // onCompleted: (favoriteData) => {
      //   if (favoriteData) {
      //     console.log('favoriteData', favoriteData)
      //     setFavorites(favoriteData.favorites)
      //   }
      // },
    })

  // 注文履歴の取得
  const { data: orderData } = useFetchOrderByIdQuery({
    variables: { userId: user && user.id ? String(user.id) : '' },
    skip: !user,
    onCompleted: (orderData) => {
      if (orderData) {
        console.log('orderData', orderData)
      }
    },
  })

  // 注文履歴取得後、注文回数の配列を作成
  useEffect(() => {
    if (orders.length !== 0) {
      console.log('orders', orders)

      const itemIds = orders.map((order) => order.item.id)
      const counts: { [key: string]: number } = {}

      // 丼IDとカウント数のみの配列を作成
      itemIds.forEach((itemId) => {
        counts[itemId] = (counts[itemId] || 0) + 1
      })

      // カウントされた結果を配列にマップ
      const countArray = Object.keys(counts).map((id) => ({ id, count: counts[id] }))
      // console.log('countArray', countArray)

      setCount(countArray)
    }
  }, [orders])

  // データとカウントが取得された後に実行
  useEffect(() => {
    // console.log('favoriteData', favoriteData)
    // console.log('count', count)

    if (favoriteData && count) {
      setLoading(true)
      const filterItems = favoriteData.favorites.map((favorite) => favorite.item)
      // console.log('filterItems', filterItems)

      // 注文回数をオブジェクトにマッピング
      const countMap = count.reduce(
        (map, obj) => {
          // 注文回数を格納
          if (obj.id) {
            map[obj.id] = obj.count
          }
          return map
        },
        {} as { [key: string]: number },
      )

      // 注文回数を含めた配列を作成
      const result = filterItems.map((favorite) => ({
        ...favorite,
        count: countMap[favorite.id] || 0,
      }))

      // console.log('result', result)

      setFavorites(result)
      setLoading(false)
    }
  }, [count, setCount, favoriteData])

  // 結果をセット
  useEffect(() => {
    if (favorites.length !== 0) {
      const shuffleID = favorites[Math.floor(Math.random() * favorites.length)]
      const favoritesID = shuffleID.id
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
