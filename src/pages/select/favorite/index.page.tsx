import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'
import {
  Item,
  useFetchFavoriteByEmailQuery,
  useSearchOrderByUserEmailQuery,
} from '@/gql/graphql'
import { useUserContext } from '@/contexts/UserContext'
import { ButtonRounded } from '@/components/atoms/buttons/ButtonRounded'
import { PageTitle } from '@/components/atoms/texts/PageTitle'
import { LoadingIndicator } from '@/components/atoms/LoadingIndicator'
import { ItemCardList } from './ItemCardList'

type ItemAddCount = Item & {
  count: string
}

export default function PageSelectFavorite() {
  const router = useRouter()

  // ユーザー情報を取得
  const [user, setUser] = useUserContext()

  // 取得したお気に入りデータ
  const [favorites, setFavorites] = useState<ItemAddCount[]>([])

  // 結果をステート管理
  const [result, setResult] = useState('')

  // 注文履歴カウント
  const [count, setCount] = useState<{ id: string; count: number }[]>([])

  // loading状態を管理
  const [loading, setLoading] = useState(false)

  // お気に入り情報の取得
  const { data } = useFetchFavoriteByEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
    // onCompleted: () => setLoading(false),
  })

  // 注文履歴の取得
  const { data: orderData } = useSearchOrderByUserEmailQuery({
    variables: { email: user && user.email ? user.email : null },
    skip: !user,
  })

  // 注文履歴取得後、注文回数の配列を作成
  useEffect(() => {
    if (orderData) {
      const itemIds = orderData.order.map((order) => order.item.id)
      const counts: { [key: string]: number } = {}

      // 丼IDとカウント数のみの配列を作成
      itemIds.forEach((itemId) => {
        counts[itemId] = (counts[itemId] || 0) + 1
      })

      // カウントされた結果を配列にマップ
      const countArray = Object.keys(counts).map((id) => ({ id, count: counts[id] }))
      setCount(countArray)
    }
  }, [orderData])

  // データとカウントが取得された後に実行
  useEffect(() => {
    if (data && count) {
      setLoading(true)
      const filterItems = data.favorites.map((favorite) => favorite.item)

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
      const result = filterItems.map((obj) => ({
        ...obj,
        count: countMap[obj.id] || 0,
      }))

      setFavorites(result)
    }
  }, [data, count, setFavorites])

  // 結果をセット
  useEffect(() => {
    if (favorites.length !== 0) {
      const shuffleID = favorites[Math.floor(Math.random() * favorites.length)]
      const favoritesID = shuffleID.id
      setResult(favoritesID)
      setLoading(false)
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
